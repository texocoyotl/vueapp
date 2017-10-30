<template>

      <v-container fluid>
    <v-layout row wrap>
       <v-flex xs3>{{ selectedList }} {{isRated}} {{ filteredType }}
      </v-flex>
      <v-flex xs9>
      <v-subheader>Filters:</v-subheader>
      <v-layout row>
          <v-btn v-for="(o, k) in options" :key="k" :value="o.value"
                 :color="isRated == o.value ? 'primary' : 'transparent'" @click="isRated=o.value">
            {{o.text}}
          </v-btn>
       
        <v-select label="All types" :items="types" v-model="filteredType" single-line  clearable solo>
        
        </v-select>
         </v-layout>
      </v-flex>
        </v-layout>
        
        <v-layout row wrap>
       <v-flex xs3>
         <v-card flat>

            <v-layout column>
          <v-btn v-for="(ll, k) in leftList" :key="k" :value="ll._id" @click="updateList(ll._id)"
                 :color="selectedList==ll._id ? 'primary' : 'transparent'"
                 >
            {{ll.name}}
          </v-btn>
              </v-layout>

         </v-card>
      </v-flex>
          
          <v-flex xs9 style="max-height: 400px" class="scroll-y" >
      <v-layout column >
              <v-slider v-for="(r, k) in filteredRatings" :key="k" :label="r.name" v-model="r.rating" min="0" max="4" step="1" snap :color="colors[r.rating]" :track-color="colors[r.rating]"></v-slider>
      </v-layout>
          </v-flex>
          
      </v-layout>
      </v-container>
      
      
      

        

</template>

<script>
  
var util = require('util');

module.exports = {
    data: function(){
        return{
          colors: ['red', 'orange', 'yellow', 'light-green', 'green'],
          types: [{text:'One', value: 1}, {text: 'Two', value: 2}, {text:'Three', value: 3}],
          filteredType: null,
          options: [
            {
              text: 'Unrated',
              value: false
            }, 
            {
              text: 'Rated',
              value: true
            }
          ],
          isRated: false,
          leftList: [
            {
              _id: 1,
              name: 'Ben'
            },
            {
              _id: 2,
              name: 'Dan'
            },
            {
              _id: 3,
              name: 'Bryan'
            }
          ],
          selectedList: 1,
          ratings: [
            {name: "Item 1", rating: null, type:1}, 
            {name:"Item 2", rating: null, type:2}, 
            {name:"Item 3", rating: null, type:1}, 
          {name:"Item 4", rating: null, type:2}, 
          {name:"Item 5", rating: null, type:1}, 
          {name:"Item 6", rating: null, type:1}, 
          {name:"Item 7", rating: null, type:3}, 
          {name:"Item 8", rating: null, type:1}, 
          {name:"Item 9", rating: null, type:3}, 
          {name:"Item 10", rating: null, type:3}, 
          {name:"Item 11", rating: null, type:3}, 
          {name:"Item 12", rating: null, type:3}]
          
            
        }
        
        },
  
        watch:{
          filteredType: function(val){
            console.log(val);
            if (val == null){
              this.filteredRatings = this.ratings;
            } else {
            this.filteredRatings = this.ratings.filter(function(r){
              return r.type == val;
            });
            }
          }
        },

        created: function()
        {
            this.filteredRatings = this.ratings;
        },

        methods: {
            updateList: function(id){
              this.selectedList = id;
            }
        }
    }
</script>