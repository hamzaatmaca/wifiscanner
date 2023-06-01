class Wifi {
    constructor() {
        this.body = document.getElementById("root")
        this.table = document.createElement("TABLE")
        this.table.innerHTML += `<thead>
				    <tr>
				      <th scope="col"><button id="renew" class="btn btn-warning">Renew</button></th>
				      <th scope="col">BARS</th>
				      <th scope="col">BSSID</th>
				      <th scope="col">CHAN</th>
				      <th scope="col">IN-USE</th>
				      <th scope="col">MODE</th>
				      <th scope="col">RATE</th>
				      <th scope="col">SECURITY</th>
				      <th scope="col">SIGNAL</th>
				      <th scope="col">SSID</th>
				    </tr>
				  </thead><tbody id="tableBody"></tbody>`
        this.data = fetch("http://localhost:5000/allWifi")
            .then(res => res.json())
            .then(data => { return data })

    }

    #Template(param, i) {
        return `           	
				<tr>
				   <th scope="row">${i+1}</th>
				   <td>${param.BARS}</td>
				   <td>${param.BSSID}</td>
				   <td>${param.CHAN}</td>
				   <td>${param["IN-USE"]}</td>
				   <td>${param.MODE}</td>
				   <td>${param.RATE}</td>
				   <td>${param.SECURITY}</td>
				   <td>${param.SIGNAL}</td>
				   <td>${param.SSID}</td>
				</tr>  
            `
    }

    Error(param) {
        throw new Error(param)
    }

    #ReNew() {
        const renew = document.getElementById("renew")
        renew.addEventListener("click", () => {
            location.reload();
        })
    }

    Table() {
        this.data.then(async (res) => {
            if (res.data === undefined || res.data === null){

            	 const result = confirm("Data is not loading. Please enter OKAY button for reload page");
            	 
            	 if(result) location.reload();
            } 

            const wifi = JSON.parse(res.data)

            this.table.classList.add("table", "layout")

            wifi.pop()

            for (var i = 0; i < wifi.length; i++) {

                this.table.innerHTML += this.#Template(wifi[i], i)
            }

            await this.body.append(this.table)

            await this.#ReNew()

        }).catch((error) => {
            this.Error(error)
        })
    }
}

new Wifi().Table()