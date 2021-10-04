export class Item {
    public id: number;
    public name: string;
    public sellPrice: number;
    public buyPrice: number;
    public createdDate: string;
    public updatedDate: string;
}

export class SelectItemType {
    label: string;
    value: any;
    price: number;
    disabled: boolean;
    
}