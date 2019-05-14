#include "genematcher.hpp"

    genematcher::genematcher(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

       void genematcher::getmatching() {
          //get DNA from db
          dna_index addresses(_code, _code.value);
          auto dna1Ptr = addresses.begin();
          string DNA1 = dna1Ptr->dna;
          auto dna2Ptr = std::next(dna1Ptr,1);
          string DNA2 = dna2Ptr->dna;
            
          //clean db
          addresses.erase(dna1Ptr); 
          addresses.erase(dna2Ptr); 
         
          //init matrix 
          int rows = DNA1.length() + 1, cols = DNA2.length() + 1;
          matrix = new int*[rows+1];
          for (int i = 0; i < rows+1; ++i)
              matrix[i] = new int[cols+1];
            
          //--------------------------------------------
          //---------------Start Algorithim-------------
          //--------------------------------------------
          int m = DNA1.length();
          int n = DNA2.length();
          //set initial costs for first row and column
          for( int i = 0; i <= m; i++ ) {
              matrix[i][0] = -4*i;
          }
          for( int j = 0; j <= n; j++) {
            matrix[0][j] = -4*j;
          }
          //set costs by the neighbor columns
          for (int i = 1; i <= m; i++) {
              for ( int j = 1; j <= n; j++) {
                  int diagonal = matrix[i-1][j-1] + costvalue( DNA1[i-1], DNA2[j-1] );
                  int beside =   matrix[i-1][j] + costvalue( DNA1[i-1], ' ' );
                  int bottom =   matrix[i][j-1] + costvalue( ' ', DNA1[j-1] );
                  int max = maxvalue(diagonal, beside, bottom);
                  matrix[i][j] = max;
              }
          }

          int matchCost = traceback( n, m, DNA1, DNA2);
          string result = getrelation(matchCost);
          print(result.c_str(),",",matchCost);

        } 


       int genematcher::maxvalue( int diagonal, int beside, int bottom ){
           int max = diagonal;
           if (beside > max) {
               max = beside;
           }

           if (bottom > max) {
               max = bottom;
           }

           return max;
        }

       
         int genematcher::costvalue(char a,char b) {

            if (a != ' ' && b != ' ') {

                if (a == b) 
                    return 5;

                return -3;
            }

            return -2;
        }
    
      
        int genematcher::traceback( int i, int j, string DNA1, string DNA2) {
          int sequenceLength = i;

          int matchCost = matrix[i][j];

          while (i > 0 && j > 0) {

              if ( matrix[i-1][j-1]  == ( matrix[i][j] - costvalue(DNA1[i-1],DNA2[j-1]) ) ) {
                  i--;
                  j--;
              } 

              else if ( matrix[i-1][j] == ( matrix[i][j] - costvalue(DNA1[i-1], ' ') ) ) {
                      i--;
                    } 
                    else 
                      if ( matrix[i][j-1]  == ( matrix[i][j] - costvalue( ' ', DNA2[j-1] ) ) )  {
                        sequenceLength++; 
                        j--;
                      }
          }

          if (j > 0) {
              while (j > 0) {
                  sequenceLength++;
                  j--;
              }
          }

          if (matchCost < 0) {
              matchCost = 0;
          }

          // calc the perecantage of match - MATCH*sequenceLength = 100%
          matchCost = (matchCost * 100) / (int)(MATCH_COST * sequenceLength);
          return matchCost;
       }
       
       
  [[eosio::action]]
  void genematcher::upsert(name user, std::string dna) {
    require_auth( user );
    dna_index addresses(_code, _code.value);
    auto iterator = addresses.find(user.value);
   
    if( iterator == addresses.end() )
    {
      addresses.emplace(user, [&]( auto& row ) {
       row.key = user;
       row.dna = dna;
      });
    }
    else {
      std::string changes;
      addresses.modify(iterator, user, [&]( auto& row ) {
        row.key = user;
        row.dna = dna;
      });
    }
  }

  [[eosio::action]]
  void genematcher::erase(name user) {
    require_auth(user);

    dna_index addresses(_self, _code.value);

    auto iterator = addresses.find(user.value);
    eosio_assert(iterator != addresses.end(), "Record does not exist");
    addresses.erase(iterator);
  }
  
    [[eosio::action]]
    void genematcher::getdna(name user) {
        require_auth(user);
        dna_index addresses(_self, _code.value);
        auto iterator = addresses.find(user.value);
        eosio_assert(iterator != addresses.end(), "Record does not exist");
        /**
         * The "get" function returns a constant reference to the object
         * containing the specified secondary key
        */
        auto currentDNA = addresses.get(user.value);
        print(" DNA: ", currentDNA.dna.c_str() );
        //return currentDNA.dna;
    }
    

    string genematcher::getrelation(int cost) {
        if (cost == SAME_DNA_COST) {
            return SAME_DNA;
        } else if (cost >= MIN_TWINS_COST && cost <= MAX_TWINS_COST) {
            return TWINS;
        } else if (cost >= MIN_MOTHER_FATHER_COST && cost <= MAX_MOTHER_FATHER_COST) {
            return MOTHER_FATHER;
        } else if (cost >= MIN_SIBLINGS_COST && cost <= MAX_SIBLINGS_COST) {
            return SIBLINGS;
        } else if (cost >= MIN_UNCLE_AUNT_COST && cost <= MAX_UNCLE_AUNT_COST) {
            return UNCLE_AUNT;
        }else if (cost >= MIN_COUSIN_COST && cost <= MAX_COUSIN_COST) {
            return COUSIN;
        } else {
            return NO_FAMILY_RELATION_DETECTED;
        }
    }

