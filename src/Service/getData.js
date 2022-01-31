function getImages(search, page) {
	return fetch(
		`https://pixabay.com/api/?q=${search}&page=${page}&key=24506585-6e38fd61df2df2110dc1b02e0&image_type=photo&orientation=horizontal&per_page=12`
	).then((response) => {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject(`По данному запросу нет изображения`);
	});
}

const imageAPI = {
	getImages,
};

export default imageAPI;
