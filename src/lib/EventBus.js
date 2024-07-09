
/** 
 * Event Bus Architecture, trigger, listen custom Events
 * */  

export const QuizEventClearResponse = 'NesoclearResponseQuiz'
 
let EventBus = {

    on : (action, callback) => {
        document.addEventListener(action,callback)
    },

    dispatch : (action, data) => {
        document.dispatchEvent(new CustomEvent(action,{detail : data}))
    },

    remove : (action, callback) => {
        document.removeEventListener(action,callback)
    }
}

export default EventBus