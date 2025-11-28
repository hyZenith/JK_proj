import AppConst from "../AppConst";


export default class ReviewRepository {

    static async ofManufacturer(id) {
        try {
            const url = new URL(AppConst.api(AppConst.manufacturerReviews));
            url.searchParams.append('id', id);

            const response = await fetch(url);

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }
        return ReviewRepository.fake(19);
    }


    static fake(count) {
        let reviews = [];
        for (let i = 1; i <= count; i++) {
            reviews.push({
                id: i,
                name: `User ${i}`,
                stars: 5,
                content: `This my review about this company ${i}`,
                avatar: `https://picsum.photos/300/300?random=${i}`
            });
        }
        return reviews;
    }
}