<template>

      <v-container fluid>
    <v-layout row wrap>
       <v-flex xs3>{{ selectedList }} {{isRated}} {{ filteredType }} 
         <br/>{{ ratings }}
      </v-flex>
      <v-flex xs9>
      <v-subheader>Filters:</v-subheader>
      <v-layout row>
          <v-btn v-for="(o, k) in options" :key="k" :value="o.value"
                 :color="isRated == o.value ? 'primary' : 'transparent'" @click="isRated=o.value">
            {{o.text}}
          </v-btn>
       
        <v-select :items="types" v-model="filteredType" single-line solo>
        
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
              <v-slider v-for="(r, k) in filteredRatings" :key="k" :label="r.name" v-model="r.rating" min="1" max="5" step="1" snap :color="colors[r.rating-1]" :track-color="colors[r.rating]"></v-slider>
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
          types: [{text:'All types', value: 0}, {text:'One', value: 1}, {text: 'Two', value: 2}, {text:'Three', value: 3}],
          filteredType: 0,
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
            {name: "Item 1", rating: 0, type:1, ratedBy: null}, 
            {name:"Item 2", rating: 0, type:2, ratedBy: null}, 
            {name:"Item 3", rating: 0, type:1, ratedBy: null}, 
          {name:"Item 4", rating: 0, type:2, ratedBy: null}, 
          {name:"Item 5", rating: 0, type:1, ratedBy: null}, 
          {name:"Item 6", rating: 0, type:1, ratedBy: null}, 
          {name:"Item 7", rating: 0, type:3, ratedBy: null}, 
          {name:"Item 8", rating: 0, type:1, ratedBy: null}, 
          {name:"Item 9", rating: 0, type:3, ratedBy: null}, 
          {name:"Item 10", rating: 0, type:3, ratedBy: null}, 
          {name:"Item 11", rating: 0, type:3, ratedBy: null}, 
          {name:"Item 12", rating: 0, type:3, ratedBy: null}]
          
            
        }
        
        },
  
        computed:{
          
          filteredRatings: function(){
              var list = this.ratings;
              var filteredType = this.filteredType;
              var isRated = this.isRated;
            
            console.log(isRated);
              
              if (isRated){
                list = list.filter(function(r){
                  console.log(r.rating);
                  return r.rating > 0;
                });
              }
              
              if (this.filteredType > 0){
                list = list.filter(function(r){
                  return r.type == filteredType;
                });
              } 
            
              return list;
          }
          
        },

        created: function(){
            
        },

        methods: {
            updateList: function(id){
              this.selectedList = id;
            }
            
          
        
         
        }
    }
</script>