import documentElement from './document';

export default function (element) {
    var offsetParent = element.offsetParent;

    while (offsetParent && offsetParent.style.position === "static") {
        offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || documentElement(element);
};

//# sourceMappingURL=offset-parent.js.map
