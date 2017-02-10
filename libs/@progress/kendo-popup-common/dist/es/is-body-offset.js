import offsetParent from './offset-parent';

export default function (element) { return (offsetParent(element) === element.ownerDocument.body); };

//# sourceMappingURL=is-body-offset.js.map
