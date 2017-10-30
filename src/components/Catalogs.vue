<template>
    <v-container fluid >
      <v-flex d-flex xs12>
        



        
    <v-layout row>
       <v-flex d-flex>
        <v-layout column mr-4>
         
      <v-list>
          <v-list-tile v-for="i in items" v-bind:key="i._id" @click="selectedItem=i">
            <v-list-tile-content>
              <v-list-tile-title v-text="i.name"></v-list-tile-title>
              <v-list-tile-sub-title v-if="i.price" v-text="i.price"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-tooltip top class="mr-4">
              <v-btn large dark slot="activator" large round color="accent"  @click="openPriceDialog(i)">
                <v-icon>delete</v-icon>
              </v-btn>
                <span>Baldur 2 Double Wrath Redux</span>
              </v-tooltip>
              </v-list-tile-action>
                <v-list-tile-action>
              <v-tooltip top class="mr-4">
              <v-btn large dark slot="activator" large round color="accent"  @click="openPriceDialog(i)">
                <v-icon>delete</v-icon>
              </v-btn>
                <span>Baldur 2 Double Wrath Redux</span>
              </v-tooltip>
              </v-list-tile-action>
            <v-list-tile-action>
              <v-btn  large round color="accent" dark @click="openPriceDialog(i)">
                <v-icon>playlist_add</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
          
 

          <v-btn color="primary" dark @click.stop="addRow" v-if="!addingItem">Add</v-btn>
          <form ref="form" v-else v-model="valid" lazy-validation>
            <v-text-field hint="Name of the item" v-model="item.name" v-validate="'required'" required :error-messages="errors.collect('name')"
            data-vv-name="name"></v-text-field>
            <v-btn @click.native="addItem">Save</v-btn>
        </form>


         </v-layout>
      </v-flex>
      <v-flex d-inline-flex>
        <v-layout column>
        
        <v-data-table
        v-bind:headers="headers"
        v-bind:items="items"
        v-bind:pagination.sync="pagination"
        item-key="_id"
        class="elevation-1"
        v-model="selectedRow"
        select-all
      >
  
      <template slot="headerCell" slot-scope="props">
      <v-tooltip v-if="selectedItem" bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
        
      <template slot="items" slot-scope="props">
        <tr>
          <td>
        <v-checkbox
          primary
          hide-details
          v-model="props.selected"
        ></v-checkbox>
      </td>
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right"></td>
        <td class="text-xs-right"></td>
          </tr>
      </template>
    </v-data-table>
              
        </v-layout>
      </v-flex>
      </v-layout>
      </v-flex>
      
                 <v-btn icon slot="activator" color="accent"  @click="openPriceDialog(i)">
                <v-icon>delete</v-icon>
              </v-btn>
      
          <v-tooltip top>
              <v-btn icon slot="activator" large round color="accent"  @click="openPriceDialog(i)">
                <v-icon>delete</v-icon>
              </v-btn>
                <span>Baldur 2 Double Wrath Redux</span>
              </v-tooltip>
  </v-container>
  
     
</template>

<script>
  
var util = require('util');

module.exports = {
    data: function(){
        return{
          item:{},
          selectedItem: null,
          dialog2: false,
          addingItem: false,
          pagination: {
              sortBy: 'name'
            },
          headers: [
          { text: 'Name', value: 'name' },
          { text: 'Price', value: 'price' },
          { text: 'Options', value: '' }
                ],
          items: [],
          selectedRow: []
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