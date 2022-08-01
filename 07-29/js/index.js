/*
 * @Author: lzy
 * @Description:
 * @Date: 2022-07-29 21:18:45
 * @LastEditTime: 2022-07-30 17:59:48
 * @FilePath: \code\test\2207Warehouse\07-29\js\index.js
 */
// 数量组件
const quantity = {
    props: ['number'],
    data() {
        return {
        }
    },
    template: `
    <div class="quantity-box">
        <button @click="number--">-</button>
        <input type="text" :value="number"/>
        <button @click="number++">+</button>
    </div>      
    `,
    methods: {

    },
    watch: {
        number() {
            this.$emit('enlarge-number', this.number);
        }
    }
}
const listParent = {
    props: ['goods', 'hobby', 'allBox'],
    data() {
        return {
            // hobby: []
            allCheck: this.addBox
        }
    },
    template: `
    <div class="cart-box">
        <ul>
            <li v-for="(item,index) in goods" :key="index">
            <img src="img/choose.png" class="check_imgs" @click="choose(index,$event)">
            <img :src="item.img"/>
            <div class="info">
                <strong>{{item.title}}</strong>
                <br/>
                <span>{{item.price,'￥' | priceFilters}}</span>
                <my-quantity :number="item.number" @enlarge-number="getNumber($event,index)"></my-quantity>
            </div>
                <p>{{item.price*item.number,'总价:   ￥' | priceFilters}}</p>
            </li>
        </ul>
    </div>      
    `,
    methods: {
        choose(_index, event) {
            // console.log(event)
            if (this.hobby.indexOf('hobby' + _index) == -1) {
                this.hobby.push('hobby' + _index);
            } else {
                this.hobby.splice(this.hobby.indexOf('hobby' + _index), 1);
            }
        },
        getNumber(event, _index) {
            this.goods[_index]['number'] = event;
            console.log(event, _index)
        }
    },
    components: {
        'my-quantity': quantity
    },
    filters: {
        priceFilters(val, str) {
            return str + val.toFixed(2);
        }
    }, watch: {
        hobby() {
            this.allcheck = true;
            let imgs = document.querySelectorAll('.check_imgs');
            imgs.forEach((item, index) => {
                if (this.hobby.indexOf('hobby' + index) === -1) {
                    item.src = 'img/choose.png';
                    this.allcheck = false;
                } else {
                    item.src = 'img/choose2.png';
                }
            })
            this.$emit('enlarge-box', this.allcheck);
        },
        goods() {

        }
    }
}