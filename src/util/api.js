import axios from 'axios'
import {Message} from 'element-ui'
import { baseURL, objBase, modelBase} from './config'

const errorMsg = '服务器内部错误'
const errorMsg401 = '登陆超时,请重新登录'
const errorFn = err => {
    console.log(err.response.status)
    let status = err.response.status
    if(status == 500) {
        Message.error(errorMsg)
    }
    if(status == 401){
        Message.error(errorMsg401)
    }
    return err
}
const codeerror = d => {
    if (d.data != null && d.data.code == 401) {
        Message.error(d.data.msg)
    }
    return d
}

const headersParam = () => {
    var param = {}
      param = {}
    return param
  }

const commonPostBody = (url, param, type) => {
    return new Promise((resolve, reject) => {
      axios.post(baseURL + url, param, {
        headers: headersParam()
      }).then(res => {
        if (res.data.retCode === 0) {
          resolve(res)
        } else {
          // Message.error(res.data.retInfo)
          // if (type === 1) {
          //   resolve()
          // }
                  resolve(res)
        }
      }).catch(
        // errorText
        )
    })
  }


const post = (_url, obj) => axios.post(_url, obj, objBase).then(codeerror).catch(errorFn)//query参数
const post2 = (_url, body) => axios.post(_url, body, modelBase).then(codeerror).catch(errorFn)//body体
const get = (obj) => axios.get(obj, objBase).then(codeerror).catch(errorFn)
const postfile =  (_url, obj) => axios.post(_url, obj,{ baseURL: baseURL,headers:{'Content-Type':'multipart/form-data'}}).then(codeerror).catch(errorFn)

//需要的接口写下面
const registrate = (param) => post2('/user/registration',param)
const huoqu = (param) => post('/article/folder/save',param)
const list = (token) => get('/article/listArticleFolder?token='+token)
//上传文章图片
const uploadArticlePic = (p) => commonPostBody('/img/uploadArticlePic', p)
//上传评论图片
const uploadCommentPic = (p) => commonPostBody('/img/uploadArticleCommentPic',p)
//上传主题头像
const uploadTopicPic = (p) => commonPostBody('/img/uploadTopicProfilePic',p)
//获取图形验证码
const getImgUrl = (param) => post('/user/getPictureCode',param)
//验证图形验证码
const verifyPictureCode = (param) => post('/user/verifyPictureCode',param)
//获取短信验证码
const getMsgCode = (param) => post('/user/getMessageCode',param)
//注册
const registration = (param) => post('/user/registration',param)
//登录
const login = (param) => post('/user/login',param)
//退出
const logout = (param) => post('/user/logout',param)
//忘记密码
const reSetPassword = (param) => post('/user/reinputPasswoed',param)
//获取用户信息
const getUserInfo = (param) => post('/user/getUserInfo',param)
//给未登录的推荐一些主题
const getNologinTopic = () => get('/recommend/recommendTopic')
//登录后关注的主题
const getloginTopic = (token) => get('/concern/listConcernTopic?token='+token)
//获取精彩推荐
const getHotArticle = (token) => get('/recommend/todayHotValueRecommend?token='+token)
//获取最新推荐
const getTodayArticle = (token) => get('/recommend/todayUpdateRecommend?token='+token)
//获取热门关键词
const getKeyWord = () => get('/search/getHotKeyWord')
//获取日排行
const getDailyRank = () => get('/rank/articleDailyRank')
//获取周排行
const getWeekRank = () => get('/rank/articleWeeklyRank')
//获取月排行
const getMonthRank = () => get('/rank/articleMonthlyRank')
//获取消息数量
const getMsgCount = (token) => get('/msg/newMsgCount?token='+token)
//获取动态
const dynamicArticle = (type,pageNum,pageSize,token) => get('/concern/listConcernUserDynamic?type='+type+'&pageNum='+pageNum+'&pageSize='+pageSize+'&token='+token)
//根据名字获取主题信息
const getTopicInfo = (topicName,token) => get('/topic/getTopicByTopicName?topicName='+topicName+'&token='+token)
//根据Id获取主题信息
const getTopicInfoById = (topicId,token) => get('/topic/getTopicByTopicId?topicId='+topicId+'&token='+token)
//获取主题文章
const gettopicArticle = (pageNum,pageSize,topicId,type) => get('/topic/getArticle?pageNum='+pageNum+'&pageSize='+pageSize+'&topicId='+topicId+'&type='+type)
//获取所有文集
const getFolderList = (token) => get('/article/listArticleFolder?token='+token)
//写文章
const write = (param) => post2('/article/write',param)
//添加主题
const addTopic = (param) => post('/topic/add',param)
//获取关注主题
const getConcernTopic = (pageNum,pageSize,token) => get('/concern/listConcernTopic?pageNum='+pageNum+'&pageSize='+pageSize+'&token='+token)
//关注主题或者取消关注
const concernTopic = (param) => post('/concern/topic',param)
//关注用户
const concernUser = (param) => post('/concern/user',param)
//获取文章信息
const getArticleInfo = (articleId,token) => get('/article/read/'+articleId+'?token='+token)
//获取文章所有评论
const getAllcomments = (articleId,pageNum,pageSize,token) => get('/comment/getArticleComment?articleId='+articleId+'&pageNum='+pageNum+'&pageSize='+pageSize+'&token='+token)
//获取特定人的评论
const getOnecomments = (param) => post('/comment/getUserComment',param)
//获取特定文章的子评论
const getSonComments = (param) => post('/comment/getSubComment',param)
//点赞或取消点赞文章
const praiseArticle = (param) => post('praise/article',param)
//点赞或取消点赞评论
const praiseComment = (param) => post('/praise/comment',param)
//回复
const comment = (param) => post('/comment/saveComment',param)
//删除评论
const deleteComments = (param) => post('/comment/removeComment',param)
//获取收藏夹
const listFold = (token) => get('/collection/listFolder?token='+token)
//新建收藏夹
const addNewFold = (param) => post('/collection/saveFolder',param)
//添加收藏
const collect = (param) => post('/collection/saveCollection',param)
//罗列收藏
const collectionList = (folderId,token) => get('/collection/listFolderCollection?folderId='+folderId+'&token='+token)
//根据文章标题或作者搜索
const searchByTitle = (titleOrAuthor,pageNum,pageSize,token) => get('/search/articleOrderByHot?titleOrAuthor='+titleOrAuthor+'&pageNum='+pageNum+'&pageSize='+pageSize+'&token='+token)
//根据用户昵称和id搜索
const searchByuser = (nikeNameOrUId,pageNum,pageSize,token) => get('/search/user?nikeNameOrUId='+nikeNameOrUId+'&pageNum='+pageNum+'&pageSize='+pageSize+'&token='+token)
//暴露接口
export default {
    baseURL,
    uploadArticlePic,
    uploadTopicPic,
    getImgUrl,
    getMsgCode,
    registration,
    reSetPassword,
    login,
    logout,
    verifyPictureCode,
    getUserInfo,
    getHotArticle,
    getTodayArticle,
    getKeyWord,
    getDailyRank,
    getWeekRank,
    getMonthRank,
    getNologinTopic,
    getloginTopic,
    getMsgCount,
    dynamicArticle,
    getTopicInfo,
    gettopicArticle,
    getFolderList,
    write,
    addTopic,
    getConcernTopic,
    concernTopic,
    getArticleInfo,
    getTopicInfoById,
    getAllcomments,
    praiseArticle,
    praiseComment,
    getSonComments,
    comment,
    uploadCommentPic,
    deleteComments,
    listFold,
    addNewFold,
    collect,
    concernUser,
    getOnecomments,
    searchByTitle,
    searchByuser,
    collectionList
}