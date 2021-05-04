export function ConvertToHtml(str: string): Element {
    const tempElment = document.createElement('div');
    tempElment.innerHTML = str;
    return tempElment;
}

export function AddList(list: any[], items: NodeListOf<HTMLHeadElement>): any[] {
    for (let i = 0; items.length > i; i++) {
        list.push(items.item(i));
    }
    return list;
}