export interface Product {
    id: number;
    path: string;
    title: string;
    description: string;
    category: string;
    gender: string;
    price: number;
    brand: string;
    colorsAvailable: string[];
    sizeAvailable: string[];
    ratings: number;
    popularity: number;
    discount: number;
    isNewArrival: boolean;
    occasion: string[];
    material: string;
    reviewCount: number;
    isAddedToWishlist: boolean;
    discountedPrice: number;
}

export interface OfferCard {
    imgSrc: string;
    title: string;
    text: string;
    link: string;
    queryParams: object;
}