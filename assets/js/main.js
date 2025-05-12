document.addEventListener('DOMContentLoaded', function(){
    const tocbox = document.querySelector('.toc-box');
    const mobileTocbox = document.querySelector('.mobile-toc');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    var headers = document.querySelectorAll('.subject-name');

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        mobileMenuButton.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a menu item
    function closeMenu() {
        mobileMenuButton.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
    }

    headers.forEach((h) => {
        // Desktop TOC items
        let tocItem = document.createElement("li");
        tocItem.id = "toc-id-" + h.textContent;

        let itemLink = document.createElement("a");
        itemLink.classList.add("content-link");
        itemLink.textContent = h.textContent;

        tocItem.append(itemLink);

        tocItem.addEventListener('click', function(){
            h.scrollIntoView({
                behavior: 'smooth'
            });
        });

        tocbox.append(tocItem);

        // Mobile TOC items
        let mobileTocItem = document.createElement("li");
        mobileTocItem.id = "mobile-toc-id-" + h.textContent;

        let mobileItemLink = document.createElement("a");
        mobileItemLink.classList.add("content-link");
        mobileItemLink.textContent = h.textContent;

        mobileTocItem.append(mobileItemLink);

        mobileTocItem.addEventListener('click', function(){
            h.scrollIntoView({
                behavior: 'smooth'
            });
            closeMenu();
        });

        mobileTocbox.append(mobileTocItem);
    });

    var contents = document.querySelectorAll('.subject, .item');

    setInterval(function(){
        var scrollPos = document.documentElement.scrollTop;
        var wh = window.innerHeight;

        Array.from(tocbox.querySelectorAll('li')).forEach(function(tocItem){
            tocItem.classList.remove('active');
        });

        Array.from(mobileTocbox.querySelectorAll('li')).forEach(function(mobileTocItem){
            mobileTocItem.classList.remove('active');
        });

        var currHead;

        Array.from(headers).forEach(function(h){
            let headPos = h.getBoundingClientRect().top + window.scrollY - wh/2;

            if (scrollPos > headPos) currHead = h;
        });

        Array.from(contents).forEach(function(c){
            let contentPos = c.getBoundingClientRect().top + window.scrollY - wh;

            if (c.classList.contains("appear")) return;

            if (scrollPos < contentPos) return;

            c.classList.add('appear');
        });

        if (currHead != undefined){
            let tocLink = document.getElementById("toc-id-" + currHead.textContent);
            let mobileTocLink = document.getElementById("mobile-toc-id-" + currHead.textContent);
            if (tocLink) tocLink.classList.add('active');
            if (mobileTocLink) mobileTocLink.classList.add('active');
        }
    }, 200);
});