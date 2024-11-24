/* CONTIENE TODOS LOS LINKS QUE GUARDO EN MI DB */
const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

/* ENDPOINT PARA REFRESCAR USUARIO ACTUAL */
router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add')
})

/* ENDOPOINT PARA AGREGAR LINK */
router.post('/add', isLoggedIn,async (req, res) => {
    const {title, url, description} = req.body
    let user_id = req.user.id
    const newLink = {
        title,
        url,
        description,
        user_id
    }
    console.log(newLink)
    await pool.query ('INSERT INTO links set ?', [newLink])
    req.flash('success', 'Link agregado con exito')
    res.redirect('/links');
})

/* ENDPOUINT PARA MOSTRAR LINKS POR USUARIO*/
router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id])
    console.log(links)
    res.render('links/list', { links })
})

/* ENDOPOINT PARA BORRAR Y REDIRECCIONAR EN LA DB */
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params
    await pool.query('DELETE FROM links WHERE id = ?', [id])
    req.flash('success', 'link borrado con exito')
    res.redirect('/links')
})

/* RUTA DE EDICION DE LINKS */
router.get('/edit/:id', isLoggedIn,async (req, res) => {
    const { id } = req.params
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id])
    res.render('links/edit', {link: links[0]} )
})

/* RUTA PARA EDITAR LINKS */
router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    const { title, url, description } = req.body
    const newLink = {
        title,
        url,
        description
    }
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id])
    req.flash('success', 'Link actualizado con exito')
    res.redirect('/links')
})

module.exports = router