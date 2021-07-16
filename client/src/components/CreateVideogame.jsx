import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGenresAction,createGame} from '../redux/videogamesDucks';


export default function CreateVideogame() {
    const [input, setInput] = useState({
        name: '',
        description: '',
        releasedate:'',
        rating: 0,
    })
    const genres = useSelector(store => store.games.genres);
    const dispatch = useDispatch();
    const [checkedGenres, setChekedGenres] = useState([]);
    const [checkedPlatforms, setCheckedPlatforms] = useState([]);
    const [errors,setErrors] = useState({
        name:'',
        description:''
    })
    function startGenres() {
        if (genres.length === 0) {
            dispatch(getGenresAction());
        }
    }


    function handleCheckboxChange(e) {
        console.log(e.target.value);
        if (checkedGenres.length === 0) {
            setChekedGenres([...checkedGenres, parseInt(e.target.value)]);
        }
        else {
            var val = checkedGenres.findIndex((genre) => genre == e.target.value);
            if (val !== -1) {
                let newArr = [...checkedGenres];
                if (val === 0) {
                    newArr.shift();
                } else {
                    newArr.splice(val, val)
                }
                setChekedGenres([...newArr]);
            } else {
                setChekedGenres([...checkedGenres, parseInt(e.target.value)]);
            }
        }

    }


    function handlePlatformsChange(e) {
        if (checkedPlatforms.length === 0) {
            setCheckedPlatforms([...checkedPlatforms, { platform: { name: e.target.value } }]);
        }
        else {
            var search = checkedPlatforms.findIndex((platform) => platform.platform.name == e.target.value);
            if (search !== -1) {
                let platformArray = [...checkedPlatforms];
                if (search === 0) {
                    platformArray.shift();
                } else {
                    platformArray.splice(search, search)
                }
                console.log("platforms: " + platformArray);
                setCheckedPlatforms([...platformArray]);
            } else {
                setCheckedPlatforms([...checkedPlatforms, { platform: { name: e.target.value } }]);
            }
        }
    }

    function handleInputChange(e) {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        startGenres();
    }, [])


    function handleErrors(e) {
        switch (e.target.name) {
            case "name":
                if (e.target.value === "") {
                    setErrors({ ...errors, [e.target.name]: "El nombre no debe estar vacío" })
                    break;
                }
                else if (/[^0-9a-zA-Z* ]/gi.test(e.target.value)) {
                    setErrors({ ...errors, [e.target.name]: "Escribe un nombre sin caracteres especiales" })
                    break;
                } else {
                    setErrors({ ...errors, [e.target.name]: "" });
                    break;
                }
            case "description":
                if(e.target.value===""){
                    setErrors({ ...errors, [e.target.name]: "La descripción no debe ser vacía" })
                    break;
                }
                else {
                    setErrors({ ...errors, [e.target.name]: "" })
                }
                break;
            default:
                return;
        }
    }
    
    function submit(){
        const body={
            name:input.name,
            description:input.description,
            releasedate:input.releasedate,
            genres:checkedGenres,
            rating:input.rating,
            platforms:checkedPlatforms,
        }
        dispatch(createGame(body));
    }

    return (
        <div>
            <form>
                <input name="name" type="text" placeholder="Nombre" onChange={handleInputChange} onBlur={handleErrors}></input>
                <textarea name="description" rows="10" cols="50"  onChange={handleInputChange} onBlur={handleErrors}></textarea>
                <input type="date" id="start" name="releasedate" min="1900-01-01" max="2021-12-31" onChange={handleInputChange}></input>
                <input name="rating" type="range" max="5" step="0.5" onChange={handleInputChange}></input>
                {
                    genres.map(genre => <label key={genre.id}>{genre.name}<input type="checkbox" name={genre.id} onChange={handleCheckboxChange} value={genre.id}></input></label>)
                }
                <label>Xbox One<input type="checkbox" name="Xbox One" onChange={handlePlatformsChange} value="Xbox One"></input></label>
                <label>Nintendo Switch<input type="checkbox" name="Nintendo Switch" onChange={handlePlatformsChange} value="Nintendo Switch"></input></label>
                <label>PlayStation 5<input type="checkbox" name="PlayStation 5" onChange={handlePlatformsChange} value="PlayStation 5"></input></label>
                <label>PC<input type="checkbox" name="PC" onChange={handlePlatformsChange} value="PC"></input></label>
            </form>
            <div>
                <p>{errors.name}</p>
                <p>{errors.description}</p>
                {checkedPlatforms.length>0&&errors.name===""&&errors.description===""?<input type="submit" value="Crear juego" onClick={submit}></input>:"Por favor complete los campos"}
            </div>
        </div>
    )
}