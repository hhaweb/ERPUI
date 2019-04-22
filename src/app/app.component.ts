import {Component, OnDestroy, Renderer2, OnInit, NgZone} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

    menuClick: boolean;

    menuButtonClick: boolean;

    userMenuClick: boolean;

    topbarUserMenuActive: boolean;

    horizontal = true;

    mobileMenuActive: boolean;

    rippleInitListener: any;

    rippleMouseDownListener: any;

    menuHoverActive: boolean;

    resetMenu: boolean;

    topbarColor = 'layout-topbar-blue';

    menuColor = 'layout-menu-light';

    themeColor = 'blue';

    layoutColor = 'blue';

    configDialogActive: boolean;

    constructor(public renderer: Renderer2, public zone: NgZone) {}

    ngOnInit() {
      this.zone.runOutsideAngular(() => {this.bindRipple(); });
    }

    bindRipple() {
        this.rippleInitListener = this.init.bind(this);
        document.addEventListener('DOMContentLoaded', this.rippleInitListener);
    }

    init() {
        this.rippleMouseDownListener = this.rippleMouseDown.bind(this);
        document.addEventListener('mousedown', this.rippleMouseDownListener, false);
    }

    rippleMouseDown(e) {
        for (let target = e.target; target && target !== this; target = target['parentNode']) {
            if (!this.isVisible(target)) {
              continue;
            }

            // Element.matches() -> https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
            if (this.selectorMatches(target, '.ripplelink, .ui-button, .ui-listbox-item, .ui-multiselect-item')) {
              const element = target;
              this.rippleEffect(element, e);
              break;
            }
        }
    }

    selectorMatches(el, selector) {
        const p = Element.prototype;
        const f = p['matches'] || p['webkitMatchesSelector'] || p['mozMatchesSelector'] || p['msMatchesSelector'] || function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
        return f.call(el, selector);
    }

    isVisible(el) {
        return !!(el.offsetWidth || el.offsetHeight);
    }

    rippleEffect(element, e) {
        if (element.querySelector('.ink') === null) {
            const inkEl = document.createElement('span');
            this.addClass(inkEl, 'ink');

            if (this.hasClass(element, 'ripplelink') && element.querySelector('span')) {
              element.querySelector('span').insertAdjacentHTML('afterend', '<span class=\'ink\'></span>');
            } else {
              element.appendChild(inkEl);
            }
        }

        const ink = element.querySelector('.ink');
        this.removeClass(ink, 'ripple-animate');

        if (!ink.offsetHeight && !ink.offsetWidth) {
            const d = Math.max(element.offsetWidth, element.offsetHeight);
            ink.style.height = d + 'px';
            ink.style.width = d + 'px';
        }

        const x = e.pageX - this.getOffset(element).left - (ink.offsetWidth / 2);
        const y = e.pageY - this.getOffset(element).top - (ink.offsetHeight / 2);

        ink.style.top = y + 'px';
        ink.style.left = x + 'px';
        ink.style.pointerEvents = 'none';
        this.addClass(ink, 'ripple-animate');
    }

    hasClass(element, className) {
        if (element.classList) {
          return element.classList.contains(className);
        } else {
          return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    }

    addClass(element, className) {
        if (element.classList) {
          element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    }

    removeClass(element, className) {
        if (element.classList) {
          element.classList.remove(className);
        } else {
          element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    getOffset(el) {
        const rect = el.getBoundingClientRect();

        return {
          top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
          left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
        };
    }

    unbindRipple() {
        if (this.rippleInitListener) {
            document.removeEventListener('DOMContentLoaded', this.rippleInitListener);
        }
        if (this.rippleMouseDownListener) {
            document.removeEventListener('mousedown', this.rippleMouseDownListener);
        }
    }

    ngOnDestroy() {
        this.unbindRipple();
    }

    onWrapperClick() {
        if (!this.menuClick && !this.menuButtonClick) {
            this.mobileMenuActive = false;
        }

        if (!this.userMenuClick) {
            this.topbarUserMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.horizontal) {
                this.resetMenu = true;
            }

            this.menuHoverActive = false;
        }

        this.userMenuClick = false;
        this.menuClick = false;
        this.menuButtonClick = false;
    }

    onMenuButtonClick(event: Event) {
        this.menuButtonClick = true;
        this.topbarUserMenuActive = false;

        if (!this.horizontal || this.isMobile()) {
            this.mobileMenuActive = !this.mobileMenuActive;
        }

        event.preventDefault();
    }

    onTopbarUserMenuButtonClick(event) {
        this.userMenuClick = true;
        this.topbarUserMenuActive = !this.topbarUserMenuActive;

        event.preventDefault();
    }

    onSidebarClick(event: Event) {
        this.menuClick = true;
        this.resetMenu = false;
    }

    isMobile() {
        return window.innerWidth <= 1024;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    changeTopbarTheme(event, color) {
        this.topbarColor = 'layout-topbar-' + color;
    }

    changeMenuToHorizontal(event, mode) {
        this.horizontal = mode;
    }

    changeMenuTheme(event, color) {
        this.menuColor = 'layout-menu-' + color;
    }

    changeComponentTheme(event, theme) {
        this.themeColor = theme;
        const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
        themeLink.href = 'assets/theme/' + 'theme-' + theme + '.css';
    }

    changePrimaryColor(event, color) {
        this.layoutColor = color;
        const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');
        layoutLink.href = 'assets/layout/css/layout-' + color + '.css';
    }
}
