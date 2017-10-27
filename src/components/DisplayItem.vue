<template>
    <div>
      
      <v-list two-line>
          <v-list-tile v-for="i in items" v-bind:key="i._id" @click="seeItem(i._id)">
            <v-list-tile-content>
              <v-list-tile-title v-text="i.name"></v-list-tile-title>
              <v-list-tile-sub-title v-if="i.price" v-text="i.price"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon color="accent" @click="openPriceDialog(i)">playlist_add</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
    
      <div class="row">
          <v-btn color="primary" dark @click.stop="addRow" v-if="!addingItem">Add</v-btn>
          <form ref="form" v-else v-model="valid" lazy-validation>
            <v-text-field hint="Name of the item" v-model="item.name" v-validate="'required'" required :error-messages="errors.collect('name')"
            data-vv-name="name"></v-text-field>
            <v-btn @click.native="addItem">Save</v-btn>
        </form>
      </div>

      
      
      

        
    </div>
</template>

<script>
  
var util = require('util');

module.exports = {
    data: function(){
        return{
          valid: false,
          addingItem: false,
          item:{},
          dialog2: false,      
          items: []
        }
            
        },

        created: function()
        {
            this.fetchItems();
        },

        methods: {
            openPriceDialog(item){
              this.dialog2 = true;
              this.item = item;
              this.$validator.reset();
            },
            addRow(){
              this.item = {};
              this.addingItem = true;
            },
            addItem(){
              this.$validator.validateAll().then((result) => {
                if (result) {
                  let uri = 'http://localhost:4000/add';
                  this.axios.post(uri, this.item).then((response) => {
                    this.fetchItems();
                    this.addingItem = false;
                  })
                }
              });
              
              
            },
            fetchItems()
            {
              let uri = 'http://localhost:4000/';
              this.axios.get(uri).then((response) => {
                  this.items = response.data;
              });
            },
            deleteItem(id)
            {
              let uri = 'http://localhost:4000/delete/'+id;
              this.items = this.items.filter(function (item){
                return item._id !== id;
              })
              this.axios.get(uri);
            },
          changeSort (column) {
            if (this.pagination.sortBy === column) {
              this.pagination.descending = !this.pagination.descending
            } else {
              this.pagination.sortBy = column
              this.pagination.descending = false
            }
          },
          seeItem(item_id){
            alert(item_id);
          }
        }
    }
</script>