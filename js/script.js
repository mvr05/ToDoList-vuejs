Vue.component('task', {
    props: ['data'], //из головного элемента в компонент
    methods: {
        task_done() {
            this.$emit('task_done');
        },

        task_delete(){
            this.$emit('task_delete');
        }
    },

    template: `
        <div class="task"
            v-on:drop="drop"
            v-on:dragover="allowDrop">
            <div class="task_title"
                v-on:dragstart="dragStart"
                draggable="true">
                <h3 class="task_subtitle_date">{{data.dates}}</h3>
                <h3 class="task_subtitle">{{data.title}}</h3>
                <p class="task_desc">{{data.desc}}</p>
            </div>
            <div class = "btn_done_delete">
                <button @click = "task_done()" class="task_done">Выполнено</button>
                <button @click = "task_delete()" class="add_task_done">Удалить</button>
            </div>
        </div>
    `,
})

var vue = new Vue({
    el: '#app',
    data: {
        new_task: {
            dates: '',
            title: '',
            desc: ''
        },
        tasks: [
        ]
    },
    methods: {
        add_done_tasks(id){
            vue_done.done_tasks.push({
                title: vue.tasks[id].title,
                desc: vue.tasks[id].desc
            })
            this.delete_tasks(id);
        },

        delete_tasks(id){
            this.tasks.splice(id, 1);
        },

        add_task(){
            var year_task = new Date(this.new_task.dates).getFullYear();
            var month_task = new Date(this.new_task.dates).getMonth();
            var day_task = new Date(this.new_task.dates).getDay();
            if(new Date().getFullYear() == year_task && new Date().getMonth() == month_task && new Date().getDay() == day_task){
                this.new_task.dates = 'Сегодня' + ' - ' + new Date().toLocaleDateString()
            } 
            else this.new_task.dates = new Date(this.new_task.dates).toLocaleDateString()
            
            if(this.new_task.title!='' && this.new_task.dates!=''){
                if(this.new_task.dates!='')
                this.tasks.push({
                    dates: this.new_task.dates,
                    title: this.new_task.title,
                    desc: this.new_task.desc,
                });
                this.new_task.dates = '',
                this.new_task.title = '';
                this.new_task.desc = '';
            }
        },

        dragStart:function(event)  {
            event.dataTransfer.setData("Text", event.target.id);
        },
        allowDrop:function(event) {
            event.preventDefault();
        },
        drop:function(event) {
            event.preventDefault();
            var data = event.dataTransfer.getData("Text");
            event.target.appendChild(document.getElementById(data));
        }
    }
});


Vue.component('taskend', {
    props: ['data'],
    methods: {
        task_delete(){
            this.$emit('task_delete');
        }
    },
    template: `
        <div class="task"
            v-on:drop="drop"
            v-on:dragover="allowDrop">
            <div class="task_title"
                v-on:dragstart="dragStart"
                draggable="true">
                <h3 class="task_subtitle_date">{{data.dates}}</h3>
                <h3 class="task_subtitle">{{data.title}}</h3>
                <p class="task_desc">{{data.desc}}</p>
            </div>
            <div class="btn_done_delete">
                <button @click = "task_delete()" class="add_task_done">Удалить</button>
            </div>
        </div>
    `
})

var vue_done = new Vue({
    el: '#app2',
    data: {
        done_tasks: [
            
        ]
    },
    methods: {

        add_done_tasks1(){
            this.done_tasks.push({
                title: this.task_delete.title,
                desc: this.tasks.desc
            });
        },

        delete_tasks(id) {
            this.done_tasks.splice(id, 1);
        },

        dragStart:function(event)  {
            event.dataTransfer.setData("Text", event.target.id);
        },
        allowDrop:function(event) {
            event.preventDefault();
        },
        drop:function(event) {
            event.preventDefault();
            var data = event.dataTransfer.getData("Text");
            event.target.appendChild(document.getElementById(data));
        }
    }
});

