#include <eosiolib/eosio.hpp>
#include <string>
#include <eosiolib/print.hpp>

using namespace eosio;
using namespace std;

class[[eosio::contract("genematcher")]] genematcher : public contract {
  public:
    using contract::contract;
    int **matrix;
    int MATCH_COST = 5;
    int SAME_DNA_COST = 100;
    int MIN_TWINS_COST = 95;
    int MAX_TWINS_COST = 99;
    int MIN_MOTHER_FATHER_COST = 80;
    int MAX_MOTHER_FATHER_COST = 94;
    int MIN_SIBLINGS_COST = 60;
    int MAX_SIBLINGS_COST = 79;
    int MIN_UNCLE_AUNT_COST = 40;
    int MAX_UNCLE_AUNT_COST = 59;
    int MIN_COUSIN_COST = 30;
    int MAX_COUSIN_COST = 39;

    string SAME_DNA = "same DNA";
    string MOTHER_FATHER = "Mother or Father";
    string TWINS = "Twins";
    string SIBLINGS = "Siblings";
    string UNCLE_AUNT = "Uncle or Aunt";
    string COUSIN = "Cousin";
    string NO_FAMILY_RELATION_DETECTED = "No family relation detected";

    genematcher(name receiver, name code, datastream<const char *> ds);
    int traceback(int i, int j, string DNA1, string DNA2);
    string getrelation(int cost);
    int maxvalue(int diagonal, int beside, int bottom);
    int costvalue(char a, char b);

    [[eosio::action]] void getmatching();
    [[eosio::action]] void upsert(name user, std::string dna);
    [[eosio::action]] void erase(name user);
    [[eosio::action]] void getdna(name user);

  private:
    struct [[eosio::table]] gene
    {
        name key;
        std::string dna;
        uint64_t primary_key() const { return key.value; }
    };
    typedef eosio::multi_index<"genes"_n, gene> dna_index;
};

EOSIO_DISPATCH(genematcher, (getmatching)(erase)(upsert)(getdna))