export default class CalcService { 
    _apiBase = 'http://localhost:3000';

    async postResours(url, newData) {
        console.log('fdfdfssssdfsdf', url);  
        console.log('fdfdfssssdfsdf1', newData);  
        const response = await fetch(`${this._apiBase}${url}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newData)
        });
        if (!response.ok){
            throw new Error('json error'); 
        }
    }

    getResours = async (url) => {

        const res = await fetch(`${this._apiBase }${url}`);
    
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json(); 
    }

    async deleteResours(url) {
        const response = await fetch(`${this._apiBase}${url}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        if (!response.ok){
            throw new Error('json error'); 
        }
    }

    async pathResours(url, object) {

        console.log('dfdsf', url);
        console.log('dfdsf1', object);

        const response = await fetch(`${this._apiBase}${url}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(object)
        });
        if (!response.ok){
            throw new Error('json error'); 
        }
    }
    postPeriod = async (url, object) => {
        const data = await this.postResours(url, object);
        return data;
    }

    postData = async (url, object) => {
        const data = await this.postResours(url, object);
        return data;
    }

    getData = async (url) => {
        const data = await this.getResours(url);
        return data;
    }

    deleteData = async (url, id) => {
        const data = await this.deleteResours(`${url}${id}`);
        return data;
    }
    pathPiggyBanc = async (url, object) => {
        const data = await this.pathResours(`${url}`, object);
        return data;
    }
    
}