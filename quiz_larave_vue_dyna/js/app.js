
new Vue({
    el: "#app",
    data: {
        books: [],
        author_id: null,
        title: '',
        body: '',
        isHidden: false,
        editeId: null,
        url: "http://127.0.0.1:8000/api/books",
    },
    methods: {
        getBook(){
            axios.get(this.url).then(response => {
                // console.log("response", response);
                console.log(this.books = response.data.data);
            });
        },
        createBook(){
            let data = {
                author_id:parseInt(this.author_id),
                title:this.title, 
                body:this.body, 
            }
            axios.post(this.url,data).then(()=>{
                // this.books = response.data.data;
                // console.log("created");
                window.location.reload();
            })
        },
        removeBook(id){
            axios.delete(this.url + '/'+ id).then(()=>{
                // this.todos= response.data.data;
                window.location.reload();
            })
        },
        editBook(book){
            this.author_id = book.author_id;
            this.title = book.title;
            this.body = book.body;
            this.editeId = book.id;
            this.isHidden = true
        },
        updateBook() {
            let data={
                author_id:parseInt(this.author_id),
                title:this.title,
                body:this.body
            };
            axios.put(this.url +'/'+this.editeId, data).then(()=>{
                window.location.reload();
            });
            this.isHidden=false
        },
    },
    mounted() {
        this.getBook();
    },
})