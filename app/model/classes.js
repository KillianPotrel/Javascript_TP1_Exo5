class ListeCourse {
    constructor(id) {
        this.id = id
        this.builddate = new Date()
        this.articles = []
    }
    toString() {
        return `${this.builddate} ${this.articles.count}`
    }
}

class Article {
    constructor(id,nom, qte) {
        this.id = id
        this.nom = nom
        this.qte = qte
        this.taken = false
    }
    toString() {
        return `${this.nom} - qte : ${this.qte} pris : ${this.taken}`
    }
}

