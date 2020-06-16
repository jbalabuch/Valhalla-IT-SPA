
export class Cart {

    constructor() {
        this.key = 'IT_SPA_CART';

        cookieStore.addEventListener('change', (event) => console.log(event));
    }

    cookie() {
        // PRZED: 'key1=val1; key2=val2; . . .'
        const cookies = document.cookie.split(';');
        // PO: ]'ket1=val1, 'key2=val2, . . .]
        const itSpaCookie = cookie.find(cookie => cookie.startsWith(this.key));
        // PO" 'IT_SPA_CART=wartosc' LUB UNDEFINED
        return itSpaCookie;
    }

    exists() {
        return this.cookie() !== undefined;
    }

    get() {
        if (this.exists()) {
        // 'IT_SPA_CART=wartość'
        const itSpaCookie = this.cookie(); // 'IT_SPA_CART=[1,2,2]'
        const cookieValue = itSpaCookie.split('=')[1]; // ['IT_SPA_CART', '[1,2,2]']
        const parsedValue = JSON.parse(cookieValue); // wartość

        return parsedValue;
        } else {
            this.set([]);
        }
    }

    set(value) {
        const stringifiedValue = JSON.stringify(value);
        document.cookie = `${this.key}=${stringifiedValue}`;
    }

    empty() {
        this.set([]);
    }

}