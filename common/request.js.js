const baseUrl = 'http://data.zuidaku.com/Uniapp.uniapp/'
// const baseUrl = 'http://192.168.43.26/flutter_tp6/public/Uniapp.uniapp/'
// http://data.zuidaku.com/flutter.flutter
const request = (url = '', date = {}, type = 'POST', header = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: type,
			url: baseUrl + url,
			data: date,
			header: header,
			dataType: 'json',
		}).then((response) => {
			setTimeout(function() {
				uni.hideLoading();
			}, 200);
			let [error, res] = response;
			resolve(res.data);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
}
export default request
