(function (window) {
    /**
     * @param 事件对象
     * @param 最外层标签
     * @param 要获取的目标元素
     * @return 返回目标元素
     */
    var findTargetTag = function (event, parent, target) {
        // 假设点击的元素在目标元素以内
        let parentTag = parent.toUpperCase()
        let targetTag = target.toUpperCase()
        return findParentTag(event.target, parentTag, targetTag)
        // tagName
    }
    function findParentTag (currentNode, parent, target) {
        if (currentNode.tagName === target) {
            return currentNode
        } else if (currentNode.tagName === parent) {
            return null
        } else {
            return findParentTag(currentNode.parentNode, parent, target)
        }
    }
    window.findTargetTag = findTargetTag;
})(window)