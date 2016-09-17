'use strict';

angular.module('mywebApp')
  .controller('AdminEditPrdouctController', ['$scope', '$location', '$state','$stateParams','$cookieStore','Upload','Compress_ready',
    function ($scope, $location, $state,$stateParams,$cookieStore,Upload,Compress_ready) {
    var self = this;
 //    self._doctor=$stateParams._doctor;
 //    var MAX = Math.pow(2, 32);
 //    var MIN = 1;

 //    var loadAccreditations=function (){
 //    	Accreditation.index({state:'doctor'},{},function (data){
 //    		self.accreditations = data.accreditations;
 //    		loadDoctor();
 //    	},function (){

 //    	});
 //    };

 //    var initArr=function (arr){
 //        if(arr.length == 0){
 //            arr[0] = '';
 //        }
 //    };

 //    var initArrs=function (){
 //    	initArr(self.doctor.career_positions);
 //        initArr(self.doctor.career_positions_chinese);
 //        initArr(self.doctor.qualification_degrees);
 //        initArr(self.doctor.qualification_degrees_chinese);
 //        initArr(self.doctor.inventions);
 //        initArr(self.doctor.inventions_chinese);
 //        initArr(self.doctor.publishments);
 //        initArr(self.doctor.publishments_chinese);
 //        initArr(self.doctor.awards);
 //        initArr(self.doctor.awards_chinese);
 //    };

 //    var loadDoctor=function (){
 //    	Doctor.show({id:self._doctor,isAdmin:true},{},function (data){
 //    		self.doctor=data.doctor;
 //    		initArrs();

 //    		self.selectOfficial=data.doctor.authorization;
 //    		_.each(self.doctor.accreditations,function (accreditation){
 //                var c = _.findWhere(self.accreditations,{_id:accreditation});
 //                if(c){
 //                    c.selectAccreditation=true;
 //                }
 //            });
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

	// self.update = function (){
	// 	var accreditations=[];
 //        _.each(self.accreditations,function (accreditation){
 //            if(accreditation.selectAccreditation==true){
 //                accreditations.push(accreditation._id);
 //            }
 //        });
 //        self.doctor.accreditations=accreditations;

 //    	Doctor.update({},self.doctor,function (data){
 //            if(data.code){
 //                return alert(data.msg);
 //            }
 //    		$state.go('admin-doctor-view',{_clinic:self.doctor._clinic._id});
 //    	},function (){
    		
 //    	});
 //    };

 //    // init();
    
}]);

