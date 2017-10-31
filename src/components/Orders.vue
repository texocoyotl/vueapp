<template>
    <v-container fluid grid-list-xl text-xs-center>
      <v-layout column wrap>
      <v-flex xs6 offset-xs3>
        
        <v-card v-for="order in orders" :key="order._id" wrap>
          
          <v-card-title primary-title>
              <h3 class="headline mb-0">{{ order.client }}</h3>
              <v-spacer></v-spacer>
              <v-btn icon @click="deleteOrder(order._id)">
                <v-icon>delete</v-icon>
              </v-btn>
          </v-card-title>
          <v-card-actions>
            
            <v-chip v-if="order.items" v-for="i in order.items" key="i._id"
                    label
              close color="primary" text-color="white" @click="seeOrder(order, i)" @input="deleteItem(i._id)">
              <v-avatar>
                <v-icon>playlist_add_check</v-icon>
              </v-avatar>
              {{ i.name }}
            </v-chip>
            
            <v-btn v-if="!order.items || order.items.length < 2" color="primary" @click="openItemDialog(order)">Add Item</v-btn>

          </v-card-actions>
        </v-card>
         

          <v-btn color="primary" dark @click.stop="addRow" v-if="!addingOrder">Add</v-btn>
          <form ref="form" v-else v-model="valid" lazy-validation>
            <v-text-field label="Name" hint="Name of the client" v-model="order.client" v-validate="'required'" required :error-messages="errors.collect('name')"
            data-vv-name="name"></v-text-field>
            <v-btn @click.native="addOrder">Save</v-btn>
            <v-btn @click.native="addingOrder=false">Cancel</v-btn>
        </form>
        
      <v-dialog v-model="dialog">
      <v-card> 
        <form ref="form" v-model="valid" lazy-validation>
          <v-card-title>
              Create An Item
            </v-card-title>
           <v-card-text>
             <v-text-field label="Name" hint="Name of the item" v-model="item.name" v-validate="'required'" required :error-messages="errors.collect('name')"
                           data-vv-name="name"></v-text-field>
             <v-select
                v-model="item.price"      
                label="Price"
                required
                :items="[10, 20, 30, 40]"
                autocomplete
               v-validate="'required'"
                       data-vv-name="price"
                       :error-messages="errors.collect('price')"
              ></v-select>
             </v-card-text>
          <v-card-actions>
            <v-btn @click.native="dialog = false">Close</v-btn>
            <v-btn @click.native="saveItem">Save</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>



      </v-flex>
         </v-layout>
      
                
  </v-container>
  
     
</template>

<script>
  
var util = require('util');

module.exports = {
    data: function(){
        return{
          valid: false,
          order:{},
          dialog: false,
          addingOrder: false,
          orders: [],
          item: {}
        }
    },

    created: function()
    {
        this.fetchOrders();
    },

    methods: {
        
      addRow(){
              this.order = {};
              this.addingOrder = true;
            },
        addOrder(){
          this.$validator.validateAll().then((result) => {
            if (result) {
              let uri = 'http://localhost:4000/orders';
              this.axios.post(uri, this.order).then((response) => {
                this.fetchOrders();
                this.addingOrder = false;
              })
            }
          });


        },
        fetchOrders()
        {
          let uri = 'http://localhost:4000/orders';
          this.axios.get(uri).then((response) => {
              this.orders = response.data;
          });
        },
        deleteOrder(id)
        {
          let uri = 'http://localhost:4000/order/'+id;
          this.axios.delete(uri);
          this.orders = this.orders.filter(function (order){
                return order._id !== id;
              });
        },
      seeOrder(order, item){
        this.item = item;
          this.dialog = true;
          this.order = order;
          this.$validator.reset();
      },
      openItemDialog(order){
          this.item = {};
          this.dialog = true;
          this.order = order;
          this.$validator.reset();
        },
      saveItem(order_id){
        this.$validator.validateAll().then((result) => {
                if (result) {
                  
                  if (this.item._id){
                    this.axios.post('http://localhost:4000/update/'+this.item._id, this.item).then((response) => {
                      this.dialog = false;
                      this.fetchOrders();
                    });
                  } else {
                  
                    this.item.order = this.order._id;

                    let uri = 'http://localhost:4000/add';
                    this.axios.post(uri, this.item).then((response) => {
                      this.dialog = false;
                      this.fetchOrders();
                    })
                  }
                  return;
                }
              });
              
      },
        deleteItem(item_id)
        {
          let uri = 'http://localhost:4000/delete/'+item_id;
          this.axios.get(uri);
          this.fetchOrders();
        }
    }
}
</script>