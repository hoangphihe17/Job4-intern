import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import Styles from './Profile.model.scss';
import images from "../../assets/images";
import Button from "../../components/Button";
import Input from "../../components/Input";
import button from "../../components/Button";
import {useNavigate} from "react-router-dom";
import Modal from "../../components/Modal";

const cx = classNames.bind(Styles);

function Profile(props) {
    const [data,setData] = useState(null);
    const [indexPage, setIndexPage] = useState(1);
    const [statusDelete, setStatusDelete] = useState("");
    const [totalPage,setTotalPage]=useState([]);
    const [showTags,setShowTags] = useState(false);
    const [tags,setTags] = useState([]);
    const [chooseTags,setChooseTags] = useState([]);
    const [isShowForm,setIsShowForm] = useState(false);
    const [statusForm, setStatusForm] = useState('');
    const [valueEdit,setValueEdit] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [indexDelete, setIndexDelete] = useState('');
    const navigate = useNavigate();

    const openModal = (e) => {
        setIsModalOpen(true);
        setIndexDelete(e);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleShowForm=(e)=>{
        if(isShowForm){
            setIsShowForm(!isShowForm);
            loadData();
        } else {
            setStatusForm(e);
            setIsShowForm(!isShowForm);
            setChooseTags([]);
        }


    }

    const handleChooseTags=(e)=>{
        if(!chooseTags.includes(e.tag)){
            let tags = chooseTags;
            tags.push(e.tag);
            setChooseTags(tags);
        }
    }

    const handleShowTag =()=>{
        setShowTags(!showTags);
        if (showTags){
            const token= JSON.parse(localStorage.getItem('token'));

            const request = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer '+ token.accessToken
                },
            };
            fetch(`https://agiletech-test-api.zeabur.app/posts/tags`, request)
                .then(res => res.json())
                .then(data => {
                    if (data){
                        setTags(data);
                    }
                }).catch(fail=>console.log(fail));
        }
    }

    const addTotal =(totalPage)=>{
        let listPage = [];
        for (let i=1;i<=totalPage;i++){
            listPage.push(i);
        }
        return listPage;
    }

    const handleSubmitFormAction=(event)=>{
        event.preventDefault();
        if (statusForm=="Add New"){
            const token= JSON.parse(localStorage.getItem('token'));

            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                    'authorization': 'Bearer ' + token.accessToken,
                },

                body : JSON.stringify({
                    title: event.target[0].value,
                    description: event.target[1].value,
                    tags: event.target[2].value.split(', '),})
            };
            fetch('https://agiletech-test-api.zeabur.app/posts', request)
                .then(res => res.json())
                .then(data => {
                    if (data){
                        alert("Add new success");
                    }
                }).catch(fail=>console.log(fail));
        }else{
            const token= JSON.parse(localStorage.getItem('token'));

            const request = {
                method: 'PATCH',
                headers: {
                    'accept': '*/*',
                    'authorization': 'Bearer ' + token.accessToken,
                },

            };
            fetch(`https://agiletech-test-api.zeabur.app/posts/${valueEdit['id']}`, request)
                .then(res => res.json())
                .then(data => {
                    if (data){
                        alert("Update success")
                    }
                }).catch(fail=>console.log(fail));
        }

    }

    function handleChangeDelete(e) {
        console.log(e);
        const token= JSON.parse(localStorage.getItem('token'));
        const request = {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'authorization': 'Bearer '+ token.accessToken
            },
        };
        fetch(`https://agiletech-test-api.zeabur.app/posts/${e}`, request)
            .then(res => res.text())
            .then(data => {
                if (data){
                    setIsModalOpen(false);
                    loadData();
                }
            }).catch(fail=>console.log(fail));
    }

    function loadData(){
        const token= JSON.parse(localStorage.getItem('token'));

        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+ token.accessToken
            },
        };
        fetch(`https://agiletech-test-api.zeabur.app/posts?page=${indexPage}`, request)
            .then(res => res.json())
            .then(data => {
                if (data && data.posts){
                    setData(data);
                    setTotalPage(addTotal(data.total_page));
                }

            }).catch(fail=>console.log(fail));
    }

    function handleChangePageIndex(e) {
        setIndexPage(e);
    }

    function handleChangeEdit(e) {
        setStatusForm('Edit');
        setIsShowForm(!isShowForm);
        setValueEdit(e);
    }
    const handleLogout = () => {
        setIsModalOpen(false);
        const token= JSON.parse(localStorage.getItem('token'));
        const request = {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'authorization': 'Bearer '+ token.accessToken
            },
        };
        fetch(`https://agiletech-test-api.zeabur.app/auth/logout`, request)
            .then(res => res.text())
            .then(data => {
                navigate("/");
                localStorage.removeItem("token");
            }).catch(fail=>console.log(fail));
    }

    useEffect(()=>{
        loadData();
    },[indexPage])
    return (
        <div className="profile">
            <div className="sidebar">
                <img src={images.logo} alt=""/>
                <a href="/home">Ports</a>
                <button onClick={handleLogout}>Logout</button>

            </div>

            <div className="profile-content">
                <div className="nav">
                    <Button primary onClick={()=>handleShowForm("Add New")}>{isShowForm?'Back':'Add New'}</Button>
                    <div className={`profile-fillers ${isShowForm?'dp-none':''}`}>
                        <Input type="text"/>
                        <div className="tags">
                            <div className="input-tags">
                                <input type="text" value={chooseTags.join(', ')}/>
                                <img src={images.iconArrowDown} alt="" onClick={handleShowTag}/>
                            </div>
                            <div className={`list-tags ${showTags?'show-tags':''}`}>
                                {
                                    tags.map(tag => (
                                        <button onClick={()=>handleChooseTags({tag})} key={tag} type="button">{tag}</button>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>

                <div className="data-posts">
                    <div className={`table ${isShowForm?'dp-none':''}`}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Tags</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    (data && data.posts) && data.posts.map((post, index) => (
                                        <tr>
                                            <td key={index}>{post.id}</td>
                                            <td>{post.title}</td>
                                            <td>{post.description}</td>
                                            <td>{post.tags.join(', ')}</td>
                                            <td className="action-cell">
                                                <button className="btn-action" onClick={() => handleChangeEdit(post)}>
                                                    <img src={images.iconEdit} alt=""/>
                                                </button>
                                                <button className="btn-action" onClick={()=>openModal(post.id)}>
                                                    <img src={images.iconDelete} alt=""/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>

                    </div>

                    <form action="" className={`form-actions ${isShowForm?'':'dp-none'}`} onSubmit={handleSubmitFormAction}>
                        <span className="form-title">{statusForm}</span>
                        <div className="form-input">
                            <span>Title</span>
                            <Input type="text" placeholder={valueEdit['title']}/>
                        </div>

                        <div className="form-input">
                            <span>Description</span>
                            <Input type="text" placeholder={valueEdit['description']}/>
                        </div>

                        <div className="form-input">
                            <span>Tags</span>
                            <div className="tags">
                                <div className="input-tags">
                                    <input type="text" value={chooseTags.join(', ')} placeholder={valueEdit['tags']}/>
                                    <img src={images.iconArrowDown} alt="" onClick={handleShowTag}/>
                                </div>
                                <div className={`list-tags ${showTags?'show-tags':''}`}>
                                    {
                                        tags.map(tag => (
                                            <button onClick={()=>handleChooseTags({tag})} key={tag} type={"button"}>{tag}</button>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <Button
                            primary
                            type="submit"
                        >Save</Button>
                    </form>
                </div>

                <div className={`pagination ${isShowForm?'dp-none':''}`}>

                    {
                        totalPage.map(item=>(
                            <button className="btn-Pagination" key={item} onClick={() => handleChangePageIndex(item)}>{item}</button>
                        ))
                    }
                </div>
            </div>
            <Modal isModalOpen={isModalOpen} click={()=>handleChangeDelete(indexDelete)} onClose={closeModal}/>
        </div>
    );
}

export default Profile;