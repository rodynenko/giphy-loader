export default (immutableObj) => {
	try {
		return immutableObj.toJS();
	} catch (e) {
		return null;
	}
}
