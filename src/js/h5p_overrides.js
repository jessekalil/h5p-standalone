H5P.findInstanceFromId = function (contentId) {
    if (!contentId) {
        return H5P.instances[0];
    }
    if (H5P.instances !== undefined) {
        for (var i = 0; i < H5P.instances.length; i++) {
            if (H5P.instances[i].contentId === contentId) {
                return H5P.instances[i];
            }
        }
    }
    return undefined;
};

/**
 * Creates requests for inserting, updating and deleting content user data.
 * It overrides the contentUserDataAjax private method in h5p.js.
 *
 * @param {number} contentId What content to store the data for.
 * @param {string} dataType Identifies the set of data for this content.
 * @param {string} subContentId Identifies sub content
 * @param {function} [done] Callback when ajax is done.
 * @param {object} [data] To be stored for future use.
 * @param {boolean} [preload=false] Data is loaded when content is loaded.
 * @param {boolean} [invalidate=false] Data is invalidated when content changes.
 * @param {boolean} [async=true]
 */
H5P.contentUserDataAjax = function(contentId, dataType, subContentId, done, data, preload, invalidate, async) {
    var instance = H5P.findInstanceFromId(contentId);
    if (instance !== undefined) {
        var xAPIState = {
            activityId: H5P.XAPIEvent.prototype.getContentXAPIId(instance),
            stateId: dataType,
            state: data
        };
        H5P.externalDispatcher.trigger('xAPIState', xAPIState);
    }
};
