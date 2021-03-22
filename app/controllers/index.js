class IndexController extends BaseController{
    constructor() {
        super()
        this.displayAllArticles()
    }

    addArticle() {
        let nom = $("#fieldArticleName").value
        let qte = $("#fieldArticleQte").value
        if ((qte === "")) {
            M.toast({html: 'Le champs quantité est obligatoire.'})
            return
        }
        if ((nom === "")) {
            M.toast({html: 'Le champs nom est obligatoire.'})
            return
        }

        if ((qte <= 0 )) {
            M.toast({html: 'Le champs quantité est invalide.'})
            return
        }
        this.model.insertArticle(nom, qte)
        this.displayAllArticles()
    }

    checkArticle(id) {
        this.model.checkCurrentArticle(id)
        this.displayAllArticles()
    }

    deleteArticle(id){
        this.model.deleteCurrentArticle(id)
        this.displayAllArticles()
    }

    displayAllArticles(){
        const listeCurrent = this.model.getCurrentListe()
        $('#titleIndex').innerText = `Liste du ${listeCurrent.builddate.toLocaleDateString()} ${listeCurrent.builddate.toLocaleTimeString()}`
        const articles = this.model.getCurrentArticle()
        let html = ""
        for(let article of articles) {
            let check = ""
            if(article.taken){
                check = `<p>
                            <label>
                                <input type="checkbox" checked="checked" onclick="indexController.checkArticle(${article.id})" />
                                <span></span>
                            </label>
                         </p>`
            } else {
                check = `<p>
                            <label>
                                <input type="checkbox" onclick="indexController.checkArticle(${article.id})"/>
                                <span></span>
                            </label>
                         </p>`
            }
            html += `<tr>
                        <td>${check}</td>
                        <td>${article.nom}</td>
                        <td>${article.qte}</td>
                        <td><a class="btn-floating" onclick="indexController.deleteArticle(${article.id})"><i class="material-icons">delete</i></a></td>
                     </tr>`
        }
        $('#articlesTable').innerHTML = html
    }

    reloadTime(){
        this.model.updateDateCurrentListe()
        const listeCurrent = this.model.getCurrentListe()
        $('#titleIndex').innerText = `Liste du ${listeCurrent.builddate.toLocaleDateString()} ${listeCurrent.builddate.toLocaleTimeString()}`
        M.toast({html: 'Actualisation de la date de votre liste effectuée.'})
    }
    newList() {
        const liste = this.model.getCurrentListe()

        if ((liste.articles.length === 0)) {
            M.toast({html: 'Vous ne pouvez pas créer une nouvelle liste sans avoir ajouté d\'articles.'})
            return
        }
            this.model.saveCurrentToArchived()
            this.model.newCurrentList()
            indexController.displayAllArticles()

    }
}

window.indexController = new IndexController()
