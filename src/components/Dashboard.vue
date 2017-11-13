<template>
    <v-container fluid >
      <v-flex d-flex xs12>
        <v-layout column>

          <pre>{{ membersChartData }}</pre>
          
          <canvas id="mycanvas" count="1"></canvas>

          
          <chartjs-radar 
                         target="mycanvas" :datalabel="'Products Coverage'" :labels="productsChartLabels" :data="productsChartData" :backgroundcolor="'rgba(75,192,192,0.1)'" :bordercolor="'#00c853'"></chartjs-radar>
          
          <canvas id="membersChart" :count="membersChartSets.length"></canvas>

          
          <chartjs-radar v-for="i in membersChartSets.length" :key="i"
                         target="membersChart" :datalabel="membersChartSets[i-1]" :labels="membersChartLabels[i-1]" 
                         :data="membersChartData[i-1]" :backgroundcolor="'rgba(75,192,192,0.1)'" :bordercolor="'#00c853'"></chartjs-radar>
          
        </v-layout>
      </v-flex>
  </v-container>
</template>

<script>
var util = require('util');
  
module.exports = {
    data: function(){
        return{
            team:{
              name: 'Thunder',
              members: [
                {
                  _id: 't1',
                  name: 'Ben',
                  users: ['u1', 'u3']
                },
                {
                  _id: 't2',
                  name: 'Tracy',
                  users: ['u2', 'u4']
                }

              ]

            },
            users:[
              {
                _id: 'u1',
                login: 'tdm1',
                product: 'HLC'
              },
              {
                _id: 'u2',
                login: 'tdm2',
                product: 'MRT'
              },
              {
                _id: 'u3',
                login: 'tdm3',
                product: 'AUL'
              },
              {
                _id: 'u4',
                login: 'tdm4',
                product: 'CRD'
              },
               {
                _id: 'u5',
                login: 'tdm5',
                 product: 'HLC'
              },
              {
                _id: 'u6',
                login: 'tdm6',
                product: 'MRT'
              },
              {
                _id: 'u7',
                login: 'tdm7',
                product: 'AUL'
              },
              {
                _id: 'u8',
                login: 'tdm8',
                product: 'CRD'
              },
               {
                _id: 'u9',
                login: 'tdm9',
                 product: 'HLC'
              }

            ],
            ratings:[
              {
                _id: 'r1',
                user_origin: 'u1',
                user_rating: 'u5',
                rating: 1
              },
              {
                _id: 'r2',
                user_origin: 'u1',
                user_rating: 'u6',
                rating: 2
              },
              {
                _id: 'r3',
                user_origin: 'u1',
                user_rating: 'u7',
                rating: 2
              },
              {
                _id: 'r4',
                user_origin: 'u1',
                user_rating: 'u8',
                rating: 4
              },
              {
                _id: 'r5',
                user_origin: 'u1',
                user_rating: 'u9',
                rating: 2
              },
              {
                _id: 'r6',
                user_origin: 'u2',
                user_rating: 'u5',
                rating: 0
              },
              {
                _id: 'r7',
                user_origin: 'u2',
                user_rating: 'u6',
                rating: 0
              },
              {
                _id: 'r8',
                user_origin: 'u2',
                user_rating: 'u7',
                rating: 2
              },
              {
                _id: 'r9',
                user_origin: 'u2',
                user_rating: 'u8',
                rating: 3
              },
              {
                _id: 'r10',
                user_origin: 'u2',
                user_rating: 'u9',
                rating: 0
              }
              
            ]
          
          
        
        }
    },
  
    watch: {
      team: function(val){
        alert('team');
      }
    },
  
    computed:{
      
      usersLookUp: function(){
        var lookup = {};
        this.users.forEach(function(u){
          lookup[u._id] = u;
        });
        return lookup;
      },
      
      ratedRatingsLookUp: function(){
        var lookup = {};
        this.ratings.forEach(function(r){
          lookup[r.user_rating] = r;
        });
        return lookup;
      },
      
      ratedUsers: function(){
        var self = this;
        var list = self.users.filter(function(user){
          return self.ratedRatingsLookUp[user._id] != null;
        });
        
        list.forEach(function(ratedUser){
          self.ratings.forEach(function(rating){
            if (rating.user_rating == ratedUser._id){
              ratingObj = {'ratedBy': rating.user_origin, 'rating': rating.rating}
              if (ratedUser.ratings){
                ratedUser.ratings.push(ratingObj);
              } else ratedUser.ratings = [ratingObj];
              
              if (!ratedUser.ratingScores){
                ratedUser.ratingScores = [0, 0, 0, 0, 0];
              }
              ratedUser.ratingScores[rating.rating] ++;
              
              if (!ratedUser.sumRatingScores){
                ratedUser.sumRatingScores = 0;
              }
              ratedUser.sumRatingScores += rating.rating;
            }
          });
        });
      
        return list;
      },
      
      ratingsByProduct: function(){
        var self=this;
        var hash = {};
        
        self.ratedUsers.forEach(function(user){
          if (!hash[user.product]){
            hash[user.product] = {
              name: user.product,
              ratings: [user.sumRatingScores],
              sumRating: user.sumRatingScores,
              avgRating: user.sumRatingScores
            }
          } else {
            var entry = hash[user.product];
            entry.ratings.push(user.sumRatingScores),
            entry.sumRating += user.sumRatingScores,
            entry.avgRating = entry.sumRating / entry.ratings.length;
          }
        });
        
        var list = [];
        Object.keys(hash).forEach(function(key){
          list.push(hash[key]);
        });
      
      
        return list;
      },
      
      productsChartData: function(){
        var self = this;
        var data = [];
        self.ratingsByProduct.forEach(function(product){
          data.push(product.avgRating);
        });
        return data;
      },

      productsChartLabels: function(){
        var self = this;
        var labels = [];
        self.ratingsByProduct.forEach(function(product){
          labels.push(product.name);
        });
        return labels;
      },
      
      ratingsByMember: function(){
        var self = this;
        var list = [];
        
        self.team.members.forEach(function(member){
          var entry = {member: member.name, ratings: []};
          var ratingsHash = {};
          
          member.users.forEach(function(memberUser){
            var ratedUsers = self.ratings.filter(function(u){
              return u.user_origin == memberUser;
            });
            
            ratedUsers.forEach(function(ratedUser){
              
              if (self.usersLookUp[ratedUser.user_rating]){
                var userInfo = self.usersLookUp[ratedUser.user_rating];
                
                var rating = {};
                if (ratingsHash[userInfo.product]){
                  rating = ratingsHash[userInfo.product];
                  rating.ratings.push(ratedUser.rating);
                  rating.sumRating += ratedUser.rating;
                  rating.avgRating = rating.sumRating / rating.ratings.length;
                } else {
                  rating.product = userInfo.product;
                  rating.ratings = [ratedUser.rating];
                  rating.sumRating = ratedUser.rating;
                  rating.avgRating = ratedUser.rating;
                  ratingsHash[userInfo.product] = rating;
                }
                
              }
            });
          });
          
          Object.keys(ratingsHash).forEach(function(key){
            entry.ratings.push(ratingsHash[key]);
          });
          
          list.push(entry);
          
        });
        
        return list;
      },
      
      membersChartSets: function(){
        var self = this;
        var data = [];
        
        self.ratingsByMember.forEach(function(member){
          data.push(member.member);
        });
        return data;
      },
      
      membersChartData: function(){
        var self = this;
        var data = [];
        
        self.ratingsByMember.forEach(function(member){
          var subdata = [];
          
          member.ratings.forEach(function(rating){
            subdata.push(rating.avgRating);
          });
  
          data.push(subdata);
          
        });
        return data;
      },

      membersChartLabels: function(){
        var self = this;
        var data = [];
        
        self.ratingsByMember.forEach(function(member){
          var subdata = [];
          
          member.ratings.forEach(function(rating){
            subdata.push(rating.product);
          });
  
          data.push(subdata);
          
        });
        return data;
      }
      
      

    },
  
    methods: {
      
    }


}
</script>