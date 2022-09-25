#ifndef CONTA_H
#define CONTA_H

#include <iostream>
using std::cout;
using std::string;

/*
Criar dois arrays, sendo um const static. Criar no main ponteiros para suas classes e usá-los para manipular os objetos das classe. Usar pelo menos dois loops, um for e um while, na sua classe. Extra - opcional: Fazer alocação de memória no main da sua classe.
*/


class Conta
{
public:
    // ...
    Conta(string , string );
    ~Conta();
    static const int MAXQUANTIDADEDEPENDENTE =2;
    static const int QUANTIDADEMAXTIPODECONTA = 3; // Conta corrente e poupança
    static const int QUANTIDADEMAXREGULACAOCADASTRAL = 4; // Regular, divida, fechada, em_analise
    static const int MAXCONTAPORPESSOA = 1;
    //static methods

    static void exibirTiposDeConta();
    static void exibirTiposDeSituacaoCadastral();
    static void setQuantidadeDependentes(int );

    void setNumero(const string &);
    string getNumero() const;
    void setCpfTitular(const string &);
    string getCpfTitular() const;
    void setIDDependentes(int*);
    const int* getIDDependentes() const;
    float getSaldo() const;
    void setSaldo(float);
    void imprimirDados() const;
    void setDiasAbertura( int );
    int getDiasAbertura() const;
    void exibirSituacaoCadastral() const;
    void setTipoDeConta(const string &);
    string getTipoDeConta() const;

private:
    // ...
    string numero;
    string cpfTitular;
    float saldo;
    int diasAbertuda;

    //static
    //um array const static
    static const string TIPOSDECONTA[ QUANTIDADEMAXTIPODECONTA ];
    static const string TIPOSDESITUACAOCADASTRAL[ QUANTIDADEMAXREGULACAOCADASTRAL ];
    int identificadorDependentes[MAXQUANTIDADEDEPENDENTE];

    string tipoDeConta;
};

#endif //CONTA_H