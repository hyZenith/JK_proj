import AppConst from "../AppConst";
import { authService } from "../service/AuthService";


export default class InquiryRepository {


    static async getCustomerInquiries() {
        try {
            const response = await fetch(AppConst.api(AppConst.customerInquiries), {
                headers: {
                    ...authService.getAuthHeader()
                }
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {

        }

        return InquiryRepository.fake(15);
    }

    static fake() {
        return [
            {
                id: 1,
                buyerName: "John Doe",
                product: "Wireless Earbuds",
                quantity: 500,
                country: "USA",
                message: "Hello, I’m interested in 500 units. Can you give a price offer?",
                conversation: [
                    { from: "buyer", text: "Hello, I’m interested in 500 units. Can you give a price offer?" },
                    { from: "supplier", text: "Sure, the price is $25 per unit for 500 pieces." },
                ],
            },
            {
                id: 2,
                buyerName: "Amira Ali",
                product: "LED Light Bulbs",
                quantity: 2000,
                country: "UAE",
                message: "Do you ship internationally and what’s your MOQ?",
                conversation: [
                    { from: "buyer", text: "Do you ship internationally and what’s your MOQ?" },
                    { from: "supplier", text: "Yes, we ship worldwide. MOQ is 500 units." },
                ],
            },
            {
                id: 3,
                buyerName: "Carlos Mendes",
                product: "Bluetooth Speakers",
                quantity: 300,
                country: "Brazil",
                message: "Please provide shipping cost to Brazil.",
                conversation: [
                    { from: "buyer", text: "Please provide shipping cost to Brazil." },
                    { from: "supplier", text: "Estimated cost is around $120 for 300 units." },
                ],
            },
        ];

    }
}