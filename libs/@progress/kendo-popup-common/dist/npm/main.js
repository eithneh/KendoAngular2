'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var alignPoint = {
    "bottom": "bottom",
    "center": "center",
    "middle": "middle",
    "left": "left",
    "right": "right",
    "top": "top"
};

var align = function (options) {
    var anchorRect = options.anchorRect;
    var anchorAlign = options.anchorAlign;
    var elementRect = options.elementRect;
    var elementAlign = options.elementAlign;
    var anchorHorizontal = anchorAlign.horizontal;
    var anchorVertical = anchorAlign.vertical;
    var elementHorizontal = elementAlign.horizontal;
    var elementVertical = elementAlign.vertical;

    var top = anchorRect.top;
    var left = anchorRect.left;

    if (anchorVertical === alignPoint.bottom) {
        top += anchorRect.height;
    }

    if (anchorVertical === alignPoint.center || anchorVertical === alignPoint.middle) {
        top += Math.round(anchorRect.height / 2);
    }

    if (elementVertical === alignPoint.bottom) {
        top -= elementRect.height;
    }

    if (elementVertical === alignPoint.center || elementVertical === alignPoint.middle) {
        top -= Math.round(elementRect.height / 2);
    }

    if (anchorHorizontal === alignPoint.right) {
        left += anchorRect.width;
    }

    if (anchorHorizontal === alignPoint.center || anchorHorizontal === alignPoint.middle) {
        left += Math.round(anchorRect.width / 2);
    }

    if (elementHorizontal === alignPoint.right) {
        left -= elementRect.width;
    }

    if (elementHorizontal === alignPoint.center || elementHorizontal === alignPoint.middle) {
        left -= Math.round(elementRect.width / 2);
    }

    return {
        top: top,
        left: left
    };
};

var applyLocationOffset = function(rect, location, isOffsetBody) {
    var top = rect.top;
    var left = rect.left;

    if (isOffsetBody) {
        left = 0;
        top = 0;
    }

    return {
        top: top + location.top,
        left: left + location.left,
        height: rect.height,
        width: rect.width
    };
};

var boundingOffset = function (element) {
    if (!element.getBoundingClientRect) {
        return {
            bottom: element.innerHeight,
            left: 0,
            right: element.innerWidth,
            top: 0
        };
    }

    var ref = element.getBoundingClientRect();
    var bottom = ref.bottom;
    var left = ref.left;
    var right = ref.right;
    var top = ref.top;

    return {
        bottom: bottom,
        left: left,
        right: right,
        top: top
    };
};

var collision = {
    "fit": "fit",
    "flip": "flip"
};

var docElement = function (element) { return ( element.ownerDocument.documentElement ); };

var offsetParent = function (element) {
    var offsetParent = element.offsetParent;

    while (offsetParent && offsetParent.style.position === "static") {
        offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || docElement(element);
};

var isBodyOffset = function (element) { return (offsetParent(element) === element.ownerDocument.body); };

var rectOfHiddenElement = function (element) {
    var ref = element.style;
    var display = ref.display;
    var left = ref.left;
    var position = ref.position;

    element.style.display = '';
    element.style.left = '-10000px';
    element.style.position = 'absolute';

    var rect = element.getBoundingClientRect();

    element.style.display = display;
    element.style.left = left;
    element.style.position = position;

    return rect;
};

var offsetRect = function (element) {
    var rect = element.getBoundingClientRect();
    var left = rect.left;
    var top = rect.top;

    if (!rect.height && !rect.width) {
        rect = rectOfHiddenElement(element);

        left = rect.left;
        top = rect.top;
    }

    return {
        top: top,
        left: left,
        height: rect.height,
        width: rect.width
    };
};

var wnd = function (element) { return ( element.ownerDocument.defaultView ); };

var position = function (element) {
    var win = wnd(element);
    var elementStyles = win.getComputedStyle(element);
    var offset = offsetRect(element);
    var parentElement = offsetParent(element);
    var parentStyles = win.getComputedStyle(parentElement);

    var parentOffset = { top: 0, left: 0 };

    if (elementStyles.position !== "fixed" && parentElement !== element.ownerDocument.body) {
        parentOffset = offsetRect(parentElement);

        parentOffset.top += parseInt(parentStyles.borderTopWidth, 10);
        parentOffset.left += parseInt(parentStyles.borderLeftWidth, 10);
    }

    return {
        top: offset.top - parentOffset.top - parseInt(elementStyles.marginTop, 10),
        left: offset.left - parentOffset.left - parseInt(elementStyles.marginLeft, 10),
        height: offset.height,
        width: offset.width
    };
};

var removeScroll = function(rect, scroll) {
    return {
        top: rect.top - scroll.y,
        left: rect.left - scroll.x,
        height: rect.height,
        width: rect.width
    };
};

var fit = function(position, size, viewPortSize) {
    var output = 0;

    if (position + size > viewPortSize) {
        output = viewPortSize - (position + size);
    }

    if (position < 0) {
        output = -position;
    }

    return output;
};

var flip = function(ref) {
    var offset = ref.offset;
    var size = ref.size;
    var anchorSize = ref.anchorSize;
    var viewPortSize = ref.viewPortSize;
    var anchorAlignPoint = ref.anchorAlignPoint;
    var elementAlignPoint = ref.elementAlignPoint;

    var output = 0;

    var isPositionCentered = elementAlignPoint === alignPoint.center || elementAlignPoint === alignPoint.middle;
    var isOriginCentered = anchorAlignPoint === alignPoint.center || anchorAlignPoint === alignPoint.middle;

    if (elementAlignPoint !== anchorAlignPoint && !isPositionCentered && !isOriginCentered) {
        if (offset + size > viewPortSize) {
            output += -(anchorSize + size);
        }

        if (offset + output < 0) {
            output += anchorSize + size;
        }
    }
    return output;
};

var restrictToView = function (options) {
    var anchorRect = options.anchorRect;
    var anchorAlign = options.anchorAlign;
    var elementRect = options.elementRect;
    var elementAlign = options.elementAlign;
    var collisions = options.collisions;
    var viewPort = options.viewPort;
    var elementTop = elementRect.top;
    var elementLeft = elementRect.left;
    var elementHeight = elementRect.height;
    var elementWidth = elementRect.width;
    var viewPortHeight = viewPort.height;
    var viewPortWidth = viewPort.width;

    var left = 0;
    var top = 0;

    var isHorizontalFlip = collisions.horizontal === collision.flip;
    var isVerticalFlip = collisions.vertical === collision.flip;

    if (collisions.vertical === collision.fit) {
        top += fit(elementTop, elementHeight, viewPortHeight);
    }

    if (collisions.horizontal === collision.fit) {
        left += fit(elementLeft, elementWidth, viewPortWidth);
    }

    if (isVerticalFlip) {
        top += flip({
            offset: elementTop,
            size: elementHeight,
            anchorSize: anchorRect.height,
            viewPortSize: viewPortHeight,
            anchorAlignPoint: anchorAlign.vertical,
            elementAlignPoint: elementAlign.vertical
        });
    }

    if (isHorizontalFlip) {
        left += flip({
            offset: elementLeft,
            size: elementWidth,
            anchorSize: anchorRect.width,
            viewPortSize: viewPortWidth,
            anchorAlignPoint: anchorAlign.horizontal,
            elementAlignPoint: elementAlign.horizontal
        });
    }

    return {
        flipped: (isHorizontalFlip && left !== 0) || (isVerticalFlip && top !== 0),
        offset: {
            left: left,
            top: top
        }
    };
};

var scrollPosition = function(element) {
    var documentElement = docElement(element);
    var win = wnd(element);

    return {
        x: win.pageXOffset || documentElement.scrollLeft || 0,
        y: win.pageYOffset || documentElement.scrollTop || 0
    };
};

var windowViewport = function(element) {
    var win = wnd(element);

    return {
        height: win.innerHeight,
        width: win.innerWidth
    };
};

exports.align = align;
exports.AlignPoint = alignPoint;
exports.applyLocationOffset = applyLocationOffset;
exports.boundingOffset = boundingOffset;
exports.Collision = collision;
exports.getDocumentElement = docElement;
exports.isBodyOffset = isBodyOffset;
exports.offsetParent = offsetParent;
exports.offset = offsetRect;
exports.position = position;
exports.removeScroll = removeScroll;
exports.restrictToView = restrictToView;
exports.scrollPosition = scrollPosition;
exports.getWindow = wnd;
exports.getWindowViewPort = windowViewport;

//# sourceMappingURL=main.js.map
