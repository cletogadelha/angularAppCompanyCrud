'use strict';

app.controller('CompanyCtrl', ['$scope', '$resource', 'Company', '$routeParams', '$window',
  function($scope, $resource, Company, $routeParams, $window) {

    $scope.successMsg = '';
    $scope.errorMsg = '';

    if ($routeParams.idCompany) {
      Colab.get({id: $routeParams.idCompany})
        .$promise.then(function(company) {
          $scope.company = company;
        });
    } else {
      $scope.colaborador = {
        id: '',
        imagem: '',
        nome: '',
        localTrabalho: '',
        biografia: '',
        profissao: '',
        competencias: [],
        listaContatos: [],
        endereco: ''
      }
    }

    $scope.removeCompany = function(id) {
      Company.delete({
        id: $scope.colaborador.id
      }, function() {
        $scope.successMsg = "Company removed!!";
        $window.location.href = '#/list';
      }, function() {
        $scope.errorMsg = "Error removing Company!"
      });
    }

    $scope.setaClasseContato = function(descricao) {
      if (descricao === 'Telefone Fixo') {
        return 'fa fa-phone fa-2x';
      } else if (descricao === 'Telefone Celular') {
        return 'fa fa-mobile fa-2x';
      } else if (descricao === 'E-Mail') {
        return 'fa fa-inbox fa-2x';
      } else if (descricao === 'Facebook') {
        return 'fa fa-facebook fa-2x';
      } else if (descricao === 'Linkedin') {
        return 'fa fa-linkedin fa-2x';
      } else if (descricao === 'Google+') {
        return 'fa fa-google-plus fa-2x';
      }
    }

    $scope.contatosDisponiveis = [{
      descricao: 'Telefone Fixo',
    }, {
      descricao: 'Telefone Celular',
    }, {
      descricao: 'E-Mail',
    }, {
      descricao: 'Facebook',
    }, {
      descricao: 'Linkedin',
    }, {
      descricao: 'Google+',
    }]

    $scope.contatoSelecionado = $scope.contatosDisponiveis[0];
    $scope.contato = '';

    $scope.insereContato = function() {
      var novoContatoColab = {
        tipo: $scope.contatoSelecionado.descricao,
        contato: $scope.contato
      }
      $scope.colaborador.listaContatos.push(novoContatoColab);
      $scope.contatoSelecionado = $scope.contatosDisponiveis[0]
      $scope.contato = '';
    }

    $scope.removeContato = function(contato) {
      var index = $scope.colaborador.listaContatos.indexOf(contato);
      $scope.colaborador.listaContatos.splice(index, 1);
    }

    $scope.resetFormCampo = function(form) {
      if (form) {
        form.contato.$setPristine();
      }
    }

    $scope.uploadArquivo = function() {
      alert('teste')
    }

    $scope.salvarColaborador = function() {

      $scope.mensagemSucesso = '';
      $scope.messageErro = '';

      var colab = new Colab($scope.colaborador);

      colab.$save()
        .then(function(res) {
          $scope.mensagemSucesso = "Colaborador Salvo com sucesso!";

          $scope.contatosInseridos = [];
          $scope.contato = '';
          $scope.searchPlace = '';

          $scope.colaborador = {
            id: '',
            imagem: '',
            nome: '',
            localTrabalho: '',
            biografia: '',
            profissao: '',
            competencias: '',
            listaContatos: [],
            endereco: ''
          }
        })
        .catch(function(req) {
          $scope.messageErro = "Erro ao salvar o colaborador;"
        });

      var element = $window.document.getElementById('cabecalho').scrollIntoView();

    }

  }

]);
