class Model {
    //Global
    constructor() {
        this.currentKey = "CURRENT_LISTE"
        this.archivedKey = "ARCHIVED_LISTE"
        this.loadCurrent()
        this.loadArchived()
        if (this.liste === undefined) { this.seed() }
    }

    seed() {
        const id = 0
        this.liste = new ListeCourse(id)
        this.saveCurrentListe()
    }

    //Fonction pour current Liste
    loadCurrent() {
        console.log(localStorage.getItem(this.currentKey))
        let datas = JSON.parse(localStorage.getItem(this.currentKey), reviver)
        if (datas !== null) {
            this.liste = (Object.assign(new ListeCourse(), datas))
        }
    }

    saveCurrentListe() {
        localStorage.setItem(this.currentKey, JSON.stringify(this.liste))
    }

    checkCurrentArticle(id){
        let monArticle = this.liste.articles.find(x => x.id === id)
        monArticle.taken = !monArticle.taken
        this.saveCurrentListe()
    }

    getCurrentListe(){
        return this.liste
    }

    getCurrentArticle(){
        return this.liste.articles
    }

    insertArticle(nom, qte) {
        let id = 0
        if(this.liste.articles.length > 0)
            id = this.liste.articles[this.liste.articles.length - 1].id + 1
        this.liste.articles.push(new Article(id, nom, qte))
        this.saveCurrentListe()
    }

    deleteCurrentArticle(id){
        for(let i = 0; i < this.liste.articles.length;i++){
            if(this.liste.articles[i].id === id)
                this.liste.articles.splice(i,1)
        }
        this.saveCurrentListe()
    }

    newCurrentList() {
        let id = 0
        if(this.archived !== undefined)
            id = this.archived[this.archived.length - 1].id + 1

        this.liste = new ListeCourse(id)
        this.saveCurrentListe()
    }

    //Fonction pour Archived Liste
    loadArchived() {
        this.archived = []
        let datas = JSON.parse(localStorage.getItem(this.archivedKey), reviver)
        if (datas !== null) {
            for (let data of datas) {
                this.archived.push(Object.assign(new ListeCourse(), data))
            }
        } else {
            this.archived = []
        }
    }

    saveArchivedListe() {
        localStorage.setItem(this.archivedKey, JSON.stringify(this.archived))
    }

    saveCurrentToArchived() {
        this.archived.push(this.liste)
        this.saveArchivedListe()
    }

    getArchivedArticles(id){
        for(let i = 0; i < this.archived.length;i++){
            if(this.archived[i].id === id)
                return this.archived[i].articles
        }
        return null
    }

    deleteArchivedListe(id){
        for(let i = 0; i < this.archived.length;i++){
            if(this.archived[i].id === id)
                this.archived.splice(i,1)
        }
        this.saveArchivedListe()
    }

    getArchivedListe(id) {
        for(let i = 0; i < this.archived.length;i++){
            if(this.archived[i].id === id)
                return this.archived[i]
        }
    }

    getArchivedListes(){
        return this.archived
    }
}
