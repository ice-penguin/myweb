'use strict';

angular.module('mywebApp')
  .controller('AdminAddDoctorController', ['$scope', '$location', '$state','$stateParams','$cookieStore','Upload','Compress_ready',
    function ($scope, $location, $state,$stateParams,$cookieStore,Upload,Compress_ready) {
    var self = this;
 //    self._clinic=$stateParams._clinic;
    
 //    var MAX = Math.pow(2, 32);
 //    var MIN = 1;
    
 //    self.doctor={
 //    	name:'',
 //    	email:'',
	// 	jobtitle:'',//职称
	// 	jobtitle_chinese:'',//职称
	// 	specialisation:'',//专业方向
	// 	specialisation_chinese:'',//专业方向
	// 	language:'',//语言
	// 	language_chinese:'',//语言
	// 	career_positions:[''],//就职经历
	// 	career_positions_chinese:[''],//就职经历
	// 	qualification_degrees:[''],//学位
	// 	qualification_degrees_chinese:[''],//学位
	// 	inventions:[''],//发明
	// 	inventions_chinese:[''],//发明
	// 	publishments:[''],//发表论文
	// 	publishments_chinese:[''],//发表论文
	// 	awards:[''],//荣誉
	// 	awards_chinese:[''],//荣誉
	// 	accreditations:[],//认证，admin增加
	// 	authorization:true,//官方认证
	// 	_clinic:self._clinic,//机构
	// 	_treatments:[],//具体项目,只保留isActive=ture的项目
	// 	thumbnail:'',//头像
	// 	blography:'',//简介
	// 	blography_chinese:'',//简介
	// 	isActive:true,//默认为true
 //    };


 //    var loadAccreditations=function (){
 //    	Accreditation.index({state:'doctor'},{},function (data){
 //    		self.accreditations = data.accreditations;
 //    	},function (){

 //    	});
 //    };

 //    var init=function (){
 //    	loadAccreditations();
 //    };

 //    //上传aws
 //    self.upload = function (files) {

 //      var now = new Date().getTime();
 //      var nowStr = now.toString();
 //      var rand = (Math.floor(Math.random() * (MAX - MIN)) + MIN).toString();
 //      var randStr = rand.toString();

 //      if (files.length === 1) {
 //        var file = files[0];
 //        var filename = 'aesthetic_'+ nowStr + '_' + randStr + '_' + file.name.replace(/[^0-9a-z\.]+/gi, '');
 //        var index=0;//尝试次数
 //        var doCompress=function(){
 //            Compress_ready.resizeFile(file).then(function(blob_data) {
 //                if(blob_data.size==0){
 //                    //尝试次数为1次，则再尝试压缩，否则报错
 //                    if(index==0){
 //                        index++;
 //                        return doCompress();
 //                    }else{
 //                        return alert(self.languagePack.error.imageError.compressError);
 //                    }
 //                }

 //                Upload.upload({
 //                  url: 'https://diandian-dev.s3-ap-southeast-1.amazonaws.com/', //S3 upload url including bucket name
 //                  //url: 'https://easybuy-products.s3-ap-southeast-1.amazonaws.com/',
 //                  method: 'POST',
 //                  fields : {
 //                    key: filename, // the key to store the file on S3, could be file name or customized
 //                    AWSAccessKeyId: 'AKIAISQS2OXGGEEWLPMA',
 //                    acl: 'public-read', // sets the access to the uploaded file in the bucket: private or public
 //                    policy: 'ewogICAgImV4cGlyYXRpb24iOiAiMjAyMC0wMS0wMVQwMDowMDowMFoiLAogICAgImNvbmRpdGlvbnMiOiBbCiAgICAgICAgeyJidWNrZXQiOiAiZGlhbmRpYW4tZGV2In0sCiAgICAgICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgIiJdLAogICAgICAgIHsiYWNsIjogInB1YmxpYy1yZWFkIn0sCiAgICAgICAgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdLAogICAgICAgIFsic3RhcnRzLXdpdGgiLCAiJGZpbGVuYW1lIiwgIiJdLAogICAgICAgIFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLCAwLCA1MjQyODgwMDBdCiAgICBdCn0=', // base64-encoded json policy (see article below)
 //                    signature: 'znqUgZJa54MSmC2MHwGVNtC5CsY=', // base64-encoded signature based on policy string (see article below)
 //                    'Content-Type': file.type !== '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
 //                    filename: filename // this is needed for Flash polyfill IE8-9
 //                  },
 //                  file: blob_data,
 //                }).then(function () {
 //                    self.doctor.thumbnail=filename;
 //                }, function () {

 //                }, function (evt) {
 //                  self.loaded = parseInt(100 * evt.loaded / evt.total, 10);
 //                  // console.log('progress: ' + self.loaded + '% file :'+ evt.config.file.name);
 //                });

 //            }, function(err_reason) {
 //              console.log(err_reason);
 //            });
 //        };

 //        doCompress();
        
 //      }
 //    };

	// self.addMore=function (value){
	// 	switch(value){
	// 		case 'career_position':
	// 			self.doctor.career_positions.push('');
	// 			break;
	// 		case 'career_position_c':
	// 			self.doctor.career_positions_chinese.push('');
	// 			break;
	// 		case 'qualification_degree':
	// 			self.doctor.qualification_degrees.push('');
	// 			break;
	// 		case 'qualification_degree_c':
	// 			self.doctor.qualification_degrees_chinese.push('');
	// 			break;	
	// 		case 'invention':
	// 			self.doctor.inventions.push('');
	// 			break;
	// 		case 'invention_c':
	// 			self.doctor.inventions_chinese.push('');
	// 			break;
	// 		case 'publishment':
	// 			self.doctor.publishments.push('');
	// 			break;
	// 		case 'publishment_c':
	// 			self.doctor.publishments_chinese.push('');
	// 			break;
	// 		case 'award':
	// 			self.doctor.awards.push('');
	// 			break;
	// 		case 'award_c':
	// 			self.doctor.awards_chinese.push('');
	// 			break;
	// 	};
	// };

 //    self.reduce=function (value,index){
	// 	switch(value){
	// 		case 'career_position':
	// 			self.doctor.career_positions.splice(index,1);
	// 			break;
	// 		case 'career_position_c':
	// 			self.doctor.career_positions_chinese.splice(index,1);
	// 			break;
	// 		case 'qualification_degree':
	// 			self.doctor.qualification_degrees.splice(index,1);
	// 			break;
	// 		case 'qualification_degree_c':
	// 			self.doctor.qualification_degrees_chinese.splice(index,1);
	// 			break;	
	// 		case 'invention':
	// 			self.doctor.inventions.splice(index,1);
	// 			break;
	// 		case 'invention_c':
	// 			self.doctor.inventions_chinese.splice(index,1);
	// 			break;
	// 		case 'publishment':
	// 			self.doctor.publishments.splice(index,1);
	// 			break;
	// 		case 'publishment_c':
	// 			self.doctor.publishments_chinese.splice(index,1);
	// 			break;
	// 		case 'award':
	// 			self.doctor.awards.splice(index,1);
	// 			break;
	// 		case 'award_c':
	// 			self.doctor.awards_chinese.splice(index,1);
	// 			break;
	// 	};
	// };

	// self.save = function (){
 //        _.each(self.accreditations,function (accreditation){
 //            if(accreditation.selectAccreditation==true){
 //                self.doctor.accreditations.push(accreditation._id);
 //            }
 //        });

 //    	Doctor.create({},self.doctor,function (data){
 //            if(data.code){
 //                return alert(data.msg);
 //            }
 //    		$state.go('admin-doctor-view',{_clinic:self._clinic});
 //    	},function (){
    		
 //    	});
 //    };

 //    init();
}]);

