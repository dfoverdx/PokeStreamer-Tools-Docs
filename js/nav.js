const ScrollSpyOffset = 12;
const HeightOfCollapsedNav = 61;
const CollapseTransitionTime = 350; // 350ms == $transition-collapse

const $bodyHtml = $('body, html');
const $body = $('body');
const $navWrapper = $('#navbar-wrapper');
const $nav = $('#nav-items');

let bodyScrollTop = null;

function setScrollOnToggle() {
    let $tog = $('.navbar-toggler');
    
    $tog.on('click', (e, clickedNavItem) => {
        if ($body.is('.noscroll') && !clickedNavItem && bodyScrollTop !== null) {
            $bodyHtml.animate({
                scrollTop: bodyScrollTop
            }, CollapseTransitionTime);
            bodyScrollTop = null;
        } else if (window.pageYOffset < $navWrapper.offset().top) {
            bodyScrollTop = window.pageYOffset;
            $bodyHtml.animate({
                scrollTop: $navWrapper.offset().top + 1
            }, CollapseTransitionTime);
        } else if (clickedNavItem) {
            bodyScrollTop = null;
        }
        
        $body.toggleClass('noscroll');
    });
    
    $nav.on('click', 'a.nav-link', () => {
        if ($tog.is(':visible')) {
            $tog.trigger('click', [true]);
        }
    });
}

function enableScrollSpy(enable = true) {
    if (enable) {
        $body.scrollspy({ target: '#nav-items', offset: ScrollSpyOffset });    
    } else {
        $body.scrollspy('dispose');
    }
}

// stolen from https://stackoverflow.com/a/45411081/3120446
function scrollNavTo($child) {
    if (!$child.length) {
        return;
    }

    const parent = $('#nav-div')[0];
    $child = $($child)[0];

    // Where is the parent on page
    var parentRect = parent.getBoundingClientRect();
    // What can you see?
    var parentViewableArea = {
        height: parent.clientHeight,
        width: parent.clientWidth
    };
    
    // Where is the child
    var childRect = $child.getBoundingClientRect();
    // Is the child viewable?
    var isViewable = (childRect.top >= parentRect.top) && (childRect.top <= parentRect.top + parentViewableArea.height);
    
    // if you can't see the child try to scroll parent
    if (!isViewable) {
        // scroll by offset relative to parent
        $(parent).animate({
            scrollTop: (childRect.top + parent.scrollTop) - parentRect.top,
        });
    }
}

function initNav() {
    setScrollOnToggle();
    $(window).on('activate.bs.scrollspy', function(e, { relatedTarget: id }) {
        if (!id) {
            return;
        }

        let $a = $(`a[href$="${id}"]`);
        if ($a.length) {
            scrollNavTo($a);
        }
    });

    let $lastActive = $nav.find('.active').last();
    if ($lastActive.length === 0) {
        $lastActive = $nav.find('.always-active');
    }

    scrollNavTo($lastActive);
    enableScrollSpy();
}

export default initNav;