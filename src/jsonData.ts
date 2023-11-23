
export default class jsonData {
    data: string;
    constructor() {
        this.data;
    }

    async fetchData(url) {
        try {
            const response = await fetch(url);
            this.data = await response.json();
            //localStorage.setItem("todos", JSON.stringify(data));
            console.log("Data fetched and stored in local storage:", this.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
    }
}