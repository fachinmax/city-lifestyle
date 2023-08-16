function getArticle(id, ariaLabelledbyAttribute) {
    let article = document.createElement('article')
    article.id = id
    ariaLabelledbyAttribute &&
        article.setAttribute('aria-labelledby', ariaLabelledbyAttribute)
    return article
}

export { getArticle }
