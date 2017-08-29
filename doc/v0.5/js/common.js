(function () {
  initMobileMenu();
  if (PAGE_TYPE) {
    initSubHeaders();
    initLocationHashFuzzyMatching();
  }

  function initLocationHashFuzzyMatching() {
    const hash = window.location.hash;
    if (!hash) return;
    const hashTarget = document.getElementById(hash);
    if (!hashTarget) {
      const normalizedHash = normalizeHash(hash);
      const possibleHashes = [].slice.call(document.querySelectorAll('[id]'))
        .map(el => el.id);
      possibleHashes.sort((hashA, hashB) => {
        const distanceA = levenshteinDistance(normalizedHash, normalizeHash(hashA));
        const distanceB = levenshteinDistance(normalizedHash, normalizeHash(hashB));
        if (distanceA < distanceB) return -1;
        if (distanceA > distanceB) return 1;
        return 0;
      });
      window.location.hash = possibleHashes[0];
    }

    function normalizeHash(rawHash) {
      return rawHash
        .toLowerCase()
        .replace(/\-(?:deprecated|removed|replaced|changed|obsolete)$/, '');
    }

    function levenshteinDistance(a, b) {
      const m = [];
      if (!(a && b)) return (b || a).length;
      for (var i = 0; i <= b.length; m[i] = [i++]) {}
      for (var j = 0; j <= a.length; m[0][j] = j++) {}
      for (var i = 1; i <= b.length; i++) {
        for (var j = 1; j <= a.length; j++) {
          m[i][j] = b.charAt(i - 1) === a.charAt(j - 1)
            ? m[i - 1][j - 1]
            : m[i][j] = Math.min(
              m[i - 1][j - 1] + 1,
              Math.min(m[i][j - 1] + 1, m[i - 1][j] + 1));
        }
      }
      return m[b.length][a.length];
    }
  }

  /**
   * Mobile burger menu button for toggling sidebar
   */

  function initMobileMenu() {
    const mobileBar = document.getElementById('mobile-bar');
    const sidebar = document.querySelector('.sidebar');
    const menuButton = mobileBar.querySelector('.menu-button');

    menuButton.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    document.body.addEventListener('click', (e) => {
      if (e.target !== menuButton && !sidebar.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

  /**
   * Sub headers in sidebar
   */

  function initSubHeaders() {
    const each = [].forEach;
    const main = document.getElementById('main');
    const header = document.getElementById('header');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');

    // build sidebar
    const currentPageAnchor = sidebar.querySelector('.sidebar-link.current');
    const isAPI = document.querySelector('.content').classList.contains('api');
    if (currentPageAnchor || isAPI) {
      var allHeaders = [];
      let sectionContainer;
      if (isAPI) {
        sectionContainer = document.querySelector('.menu-root');
      } else {
        sectionContainer = document.createElement('ul');
        sectionContainer.className = 'menu-sub';
        currentPageAnchor.parentNode.appendChild(sectionContainer);
      }
      let headers = content.querySelectorAll('h2');
      if (headers.length) {
        each.call(headers, (h) => {
          const h3s = collectH3s(h);
          allHeaders.push(h);
          allHeaders.push(...h3s);
        });
      } else {
        headers = content.querySelectorAll('h3');
        each.call(headers, (h) => {
          allHeaders.push(h);
        });
      }

      var animating = false;

      // make links clickable
      allHeaders.forEach(makeHeaderClickable);

      smoothScroll.init({
        speed: 400,
        offset: 0,
      });
    }

    let hoveredOverSidebar = false;
    sidebar.addEventListener('mouseover', () => {
      hoveredOverSidebar = true;
    });
    sidebar.addEventListener('mouseleave', () => {
      hoveredOverSidebar = false;
    });

    // listen for scroll event to do positioning & highlights
    window.addEventListener('scroll', updateSidebar);
    window.addEventListener('resize', updateSidebar);

    function updateSidebar() {
      const doc = document.documentElement;
      const top = doc && doc.scrollTop || document.body.scrollTop;
      if (animating || !allHeaders) return;
      let last;
      for (let i = 0; i < allHeaders.length; i++) {
        const link = allHeaders[i];
        if (link.offsetTop > top) {
          if (!last) last = link;
          break;
        } else {
          last = link;
        }
      }
      if (last) { setActive(last.id, !hoveredOverSidebar); }
    }

    function makeLink(h) {
      const link = document.createElement('li');
      const text = h.textContent.replace(/\(.*\)$/, '');
      link.innerHTML =
        `<a class="section-link" data-scroll href="#${h.id}">${
          htmlEscape(text)
        }</a>`;
      return link;
    }

    function htmlEscape(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    function collectH3s(h) {
      const h3s = [];
      let next = h.nextSibling;
      while (next && next.tagName !== 'H2') {
        if (next.tagName === 'H3') {
          h3s.push(next);
        }
        next = next.nextSibling;
      }
      return h3s;
    }

    function makeSubLinks(h3s, small) {
      const container = document.createElement('ul');
      if (small) {
        container.className = 'menu-sub';
      }
      h3s.forEach((h) => {
        container.appendChild(makeLink(h));
      });
      return container;
    }

    function setActive(id, shouldScrollIntoView) {
      const previousActive = sidebar.querySelector('.section-link.active');
      const currentActive = typeof id === 'string' ?
        sidebar.querySelector(`.section-link[href="#${id}"]`) :
        id;
      if (currentActive !== previousActive) {
        if (previousActive) previousActive.classList.remove('active');
        currentActive.classList.add('active');
        if (shouldScrollIntoView) {
          const currentPageOffset = currentPageAnchor ?
            currentPageAnchor.offsetTop - 8 :
            0;
          const currentActiveOffset = currentActive.offsetTop + currentActive.parentNode.clientHeight;
          const sidebarHeight = sidebar.clientHeight;
          const currentActiveIsInView = (
            currentActive.offsetTop >= sidebar.scrollTop &&
            currentActiveOffset <= sidebar.scrollTop + sidebarHeight
          );
          const linkNotFurtherThanSidebarHeight = currentActiveOffset - currentPageOffset < sidebarHeight;
          const newScrollTop = currentActiveIsInView ?
            sidebar.scrollTop :
            linkNotFurtherThanSidebarHeight ?
            currentPageOffset :
            currentActiveOffset - sidebarHeight;
          sidebar.scrollTop = newScrollTop;
        }
      }
    }

    function makeHeaderClickable(link) {
      const wrapper = document.createElement('a');
      wrapper.href = `#${link.id}`;
      wrapper.setAttribute('data-scroll', '');
      link.parentNode.insertBefore(wrapper, link);
      wrapper.appendChild(link);
    }
  }
}());
