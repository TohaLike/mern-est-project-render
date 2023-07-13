import React, { useContext, useState, useEffect } from "react"
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export const CreatePage = () => {
   const navigate = useNavigate()
   const auth = useContext(AuthContext)
   const { request } = useHttp()
   const [link, setLink] = useState('')

   useEffect(() => {
      window.M.updateTextFields()
   }, [])

   const pressHandler = async event => {
      if (event.key === 'Enter') {
         try {
            const data = await request('/api/link/generate', 'POST', { from: link }, {
               Authorization: `Bearer ${auth.token}`
            })
            navigate(`/detail/${data.link._id}`)
         } catch (e) { }
      }
   }

   return (
      <div className="row">
         <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
            <div className="input-field">
               <input
                  id="link"
                  placeholder="Вставьте ссылку"
                  type="text"
                  value={link}
                  style={{ fontSize: 18 }}
                  onChange={e => setLink(e.target.value)}
                  onKeyDown={pressHandler}
               />
               <label className="active" htmlFor="link" style={{ fontSize: 16 }}>Введите ссылку</label>
            </div>
         </div>
      </div>
   )
}