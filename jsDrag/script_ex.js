var example1 = new Vue({
    el: '#app',
    data: {
        current_task: [],
        completed_task: [
            {
                title: 'Накормить собаку',
                desc: 'Погулять с собакой'
            },
            {
                title: 'Накормить собаку1',
                desc: 'Погулять с собакой'
            },
            {
                title: 'hgvfbhjiuhgb',
                desc: 'gthyjgtrfe'
            },
        ],
        new_task: {},
        
    },

    methods: {
        add_done_tasks(id){
            this.current_task.push({
                title: this.completed_task[id].title,
                desc: this.completed_task[id].desc
            })
            this.delete_tasks(id);
        },

        delete_tasks(id){
            this.completed_task.splice(id, 1);
        },

        delete_tasks_current(id){
            this.current_task.splice(id, 1);
        },

        dragStart:function(event)  {
            event.dataTransfer.setData("Text", event.target.id);
        },
            
        allowDrop:function(event) {
            event.preventDefault();
        },
        
        drop:function(event) {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            console.log(data)
            //event.target.appendChild(document.getElementById(data));
        }
    }
})
