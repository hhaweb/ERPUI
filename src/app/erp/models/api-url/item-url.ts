import { environment } from 'src/environments/environment';
const controllerName = 'item';
const baseUrl: string = environment.API_BASE + '/' + controllerName + '/';
export const ItemUrls = {
    itemList: baseUrl + 'item-list',
    saveItem: baseUrl + 'item-save',
    deleteItem: baseUrl + 'item-delete'
}