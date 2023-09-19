import express from 'express';
import mysql from 'mysql2/promise'
import { PostContactosOutput, DeleteContactoOutput, DeleteContactosOutput, Contacto, categorias, PutContactoOutput } from './commonData'
import bodyParser from 'body-parser';
import helmet from "helmet";
import { z } from 'zod'
import { createUnionSchema } from './zod';

let pool = mysql.createPool({
  host: process.env["MYSQL_HOST"],
  user: process.env["MYSQL_USER"],
  password: process.env["MYSQL_PASSWORD"],
  database: process.env["MYSQL_DB"],
  connectionLimit: 5,
  connectTimeout: 60 * 1000
});

const migrations = [
  `CREATE TABLE if not exists contactos (id INT NOT NULL AUTO_INCREMENT, nombreCompleto VARCHAR(1024) NOT NULL, nombreEmpresa VARCHAR(1024) NOT NULL, correoElectronico VARCHAR(1024) NOT NULL, telefono VARCHAR(16) NOT NULL, categoria VARCHAR(1024) NOT NULL, mensaje VARCHAR(8192) NOT NULL, visto BOOLEAN NOT NULL, fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY (id));`
]

async function migrate () {
  try {
    console.log("DB: Iniciando migración")
    for (const migration of migrations) {
      await getConnection((conn) => conn.query(migration))
    }
    console.log("DB: Migración completada")
  } catch (error) {
    console.log("DB: Error en migración")
    console.log(error)
  }
}

/**
 * Solicita al pool una conexión a la base de datos y cuando termina la libera del pool
 */
async function getConnection<T>(callback: (connection: mysql.PoolConnection) => T) {
  let connection;
  try {
    connection = await pool.getConnection();
    return await callback(connection)
  } finally {
    if (connection) connection.release(); //release to pool
  }
}

const app = express();

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.send("Hello world");
});

app.get('/contactos', async (req, res) => {
  try {
    const { mostrarExclusivamenteMensajesNoVistos } = req.query
    const query = mostrarExclusivamenteMensajesNoVistos === 'true'
    ? "SELECT * FROM contactos WHERE visto = FALSE ORDER BY id DESC;"
    : "SELECT * FROM contactos ORDER BY id DESC;"
    const [contactos] = await getConnection((conn) => conn.query(query))
    res.send(contactos)
  } catch (error) {
    console.log(error)
    res.send([])
  }
});

app.post('/contactos', async (req, res) => {
  try {
    const contacto: Contacto = req.body
    if (!contacto) { return res.send({ success: false } satisfies PostContactosOutput) }
    const postContactoModel = z.object({
      nombreCompleto: z.string().min(1),
      nombreEmpresa: z.string().min(1),
      correoElectronico: z.string().min(1).email(),
      telefono: z.string().min(10),
      categoria: createUnionSchema(categorias),
      mensaje: z.string().min(1)
    })
    const { success } = postContactoModel.safeParse(contacto)
    if (!success) { return res.send({ success: false } satisfies PostContactosOutput) }
    const contactoArray = [contacto.nombreCompleto, contacto.nombreEmpresa, contacto.correoElectronico, contacto.telefono, contacto.categoria, contacto.mensaje]
    await getConnection((conn) => conn.query("INSERT INTO contactos (nombreCompleto, nombreEmpresa, correoElectronico, telefono, categoria, mensaje, visto) VALUES (?, ?, ?, ?, ?, ?, FALSE);", contactoArray))
    res.send({ success: true } satisfies PostContactosOutput)
  } catch (error) {
    console.log(error)
    res.send({ success: false } satisfies PostContactosOutput)
  }
});

app.delete('/contactos', async (req, res) => {
  try {
    await getConnection((conn) => conn.query(`TRUNCATE TABLE contactos;`))
    res.send({ success: true } satisfies DeleteContactosOutput)
  } catch (error) {
    console.log(error)
    res.send({ success: false } satisfies DeleteContactosOutput)
  }
});

app.delete('/contactos/:id', async (req, res) => {
  try {
    const { id } = req.params
    await getConnection((conn) => conn.query(`DELETE FROM contactos WHERE id = ?;`, id))
    res.send({ success: true } satisfies DeleteContactoOutput)
  } catch (error) {
    console.log(error)
    res.send({ success: false } satisfies DeleteContactoOutput)
  }
});

app.put('/contactos/:id', async (req, res) => {
  try {
    const contacto: Contacto = req.body
    if (!contacto) { return res.send({ success: false } satisfies PutContactoOutput) }
    const putContactoModel = z.object({
      id: z.number().min(1),
      nombreCompleto: z.string().min(1),
      nombreEmpresa: z.string().min(1),
      correoElectronico: z.string().min(1).email(),
      telefono: z.string().min(10),
      categoria: createUnionSchema(categorias),
      mensaje: z.string().min(1),
      visto: z.boolean(),
      fechaCreacion: z.string().min(1)
    })
    const { success } = putContactoModel.safeParse(contacto)
    if (!success) { return res.send({ success: false } satisfies PutContactoOutput) }
    const contactoArray = [contacto.nombreCompleto, contacto.nombreEmpresa, contacto.correoElectronico, contacto.telefono, contacto.categoria, contacto.mensaje, contacto.visto, contacto.id]
    await getConnection((conn) => conn.query("UPDATE contactos SET nombreCompleto = ?, nombreEmpresa = ?, correoElectronico = ?, telefono = ?, categoria = ?, mensaje = ?, visto = ? WHERE id = ?;", contactoArray))
    res.send({ success: true } satisfies PutContactoOutput)
  } catch (error) {
    console.log(error)
    res.send({ success: false } satisfies PutContactoOutput)
  }
});

const port = 80
const host = '0.0.0.0'
app.listen(port, host, async () => {
  await migrate()
  console.log(`Servidor corriendo en http://${host}:${port}`);
});
