export class BookingApi{

    public static async getCount(){
        const resp = await fetch(`http://localhost:5000`, {
            method: "GET"
        });
        const data = await resp.json();
        return data;
    }

    public static async adminReq(){
        const resp = await fetch(`http://localhost:5000/admin`, {
            method: "GET"
        });
        const data = await resp.json();
        return data;
    }

    public static async addTicks(nameUser: string, quantity: number){
        const resp = await fetch(`http://localhost:5000/add?name=${nameUser}&limit=${quantity}`, {
            method: "GET"
        });
        const data = await resp.json();
        return data;
    }

    public static async delTicks(nameUser: string, quantity: number){
        const resp = await fetch(`http://localhost:5000/del?name=${nameUser}&limit=${quantity}`, {
            method: "GET"
        });
        const data = await resp.json(); 
        return data;
    }

    public static async delAllTicks(){
        const resp = await fetch("http://localhost:5000", {
            method: "GET"
        });
        const data = await resp.json();
        return data;
    }
}