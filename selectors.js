const selectCloudinaryImages = (state, tabId) => {
    return _.filter(state[tabId], { 'isCloudinary': true});
}