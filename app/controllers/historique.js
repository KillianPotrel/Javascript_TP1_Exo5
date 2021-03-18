class HistoriqueController extends BaseController{
    constructor() {
        super()
        this.displayAllListe()
    }

    openModalDelete(id){
        const liste = this.model.getArchivedListe(id)
        $('#textModal').innerText = `Êtes vous sûr de vouloir supprimer la liste du ${liste.builddate.toLocaleDateString()} ${liste.builddate.toLocaleTimeString()} ?`
        $('#btnDeleteValide').setAttribute("onclick",`historiqueController.deleteListe(${liste.id})`)
        this.getModal("#listeDeleteModal").open()
    }

    openModalInfo(id) {
        const liste = this.model.getArchivedListe(id)
        $('#textModalArticle').innerText = `Article de la liste du ${liste.builddate.toLocaleDateString()} ${liste.builddate.toLocaleTimeString()}`
        const articles = this.model.getArchivedArticles(id)
        let html = ""
        for(let article of articles) {
            let taken = "Non"
            if(article.taken)
                taken = "Oui"
            html += `<tr>
                        <td>${article.nom}</td>
                        <td>${article.qte}</td>
                        <td>${taken}</td>
                     </tr>`
        }
        $('#articlesTableHistorique').innerHTML = html
        this.getModal("#listeModalArticle").open()
    }

    deleteListe(id){
        this.model.deleteArchivedListe(id)
        historiqueController.displayAllListe()
        this.getModal("#listeDeleteModal").close()
    }

    displayAllListe(){
        const listes = this.model.getArchivedListes()
        let html = ""
        for(let liste of listes) {
            let check = ""
            html += `<tr>
                        <td><a class="btn" onclick="historiqueController.openModalInfo(${liste.id})">${liste.builddate.toLocaleDateString()} ${liste.builddate.toLocaleTimeString()}</a></td>
                        <td>${liste.articles.length}</td>
                        <td><a class="btn-floating" onclick="historiqueController.openModalDelete(${liste.id})"><i class="material-icons">delete</i></a></td>
                     </tr>`
            }
        $('#listeTable').innerHTML = html
    }
}

window.historiqueController = new HistoriqueController()
