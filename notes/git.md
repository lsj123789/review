## Git
#### git处理文件的方式
* 记录具体发生了哪些差异和上一个版本相比发生了哪些变化，然后版本控制系统通过这些版本差异，最终回到指定版本

#### 基本原理
* 高层命令：和应用层相关的命令，也就是常用的git commit、git push
* 底层命令：是连接git应用界面和git底层的一个管道，类似于shell eg：git hash-object(把文件当前内容压缩成二进制文件，存入git)

#### 查找方式
* 采用HashTable方式查找，也就是通过简单的键值对的方式实现内容寻址的
* key：文件的hash值(共40位，前两位为子文件夹，后38位文件名)
* value：经过压缩后的文件内容

#### 区
* 工作区：代码编写区 通过git add命令将文件加入到本地暂存区
* 暂存区：本地暂存区 通过git commit命令将文件加入本地版本库
* 本地版本库：通过git push命令将代码推到远程库，通过git pill拉取远程代码
* 远程库：remote

# 常用命令
* git init：创建一个全新的空仓库 或将已经存在的项目纳入版本管理
* git config --global user.name 'xxx'：配置和修改全局名
* git config --global user.email 'xxx'：配置和修改全局email    
 => 如果配置的用户名和邮箱不生效，(可能原因：Linux系统问题) 可以执行git config --replace-all user.name 'your name'来代替之前配置的name
* git clone url：克隆代码到本地版本库
* git fetch：从远端拉代码 不会自动merge
* git pull：从远端拉代码 会自动merge 相当于git fetch + git merge
* git checkout：切换分支
* git diff：比较工作区和暂存区里的最新版本区别
* git diff HEAD：比较工作区和版本库里最新版本的区别
* git status：查看git 状态
* git branch：查看所有本地分支
* git branch -r：查看所有远程分支
* git branch -a： 查看所有本地分支和远程分支
* git tag：列出所有tag
* git ls-remote --tags origin：查看远程tags
* git log：查看历史提交记录
* git push -f origin <branchName>：直接回退版本让远程和本地代码保持一致

#### git分支操作
* git的分支实质就是指向提交对象的可变指针
* git branch：新建分支
* git branch <name> commitId：基于某次提交新建分支
* git checkout -b <branchName><tagName>：基于某个tag新建分支
* git stash branch <name>：基于指定stash创建并切换分支
* git checkout -b <branchName>：基于当前分支新建并切换分支
* git checkout -b <name> origin/<name>：拉取远程分支并创建本地同名分支
* git branch -m <oldName><newName>：重命名本地分支名
* git branch --set-upstream-to=origin/<branch> <localBranch>：本地分支关联远程分支
* git branch –D [name]：强行删除本地分支
* git push origin --delete [name]或git branch -d -r origin/[name] 
 ：删除远程分支
* git branch [name] <commitId> ：恢复被删除的分支

#### git tag操作
* git tag [name] ：创建tag
* git tag -a [name] ：创建含注解的tag
* git push origin [name] ：push已创建的tag
* git push origin –tags ：push本地所有tag
* git tag -d [本地 tag 名] ：删除本地指定tag
* git push origin :refs/tags/[远程 tag 名] ：删除远程指定tag
* git fetch origin[远程 tag 名] ：拉取远程指定tag
* git fetch -t：拉取远程所有tag

#### git stash操作
* git stash：存储工作区和暂存区所有被追踪的文件
* git stash -u :可以存储新建文件
* git stash push -m "msg" ：给暂存添加说明
* git stash list ：查看多次存储内容的列表，最新存储在上面
* git stash apply ：用最新存储的内容代替工作区或暂存区
* git stash apply stash@{1} ：指定应用哪一个存储
* git stash drop stash@{1} ：删除指定存储
* git stash clear ：删除所有存储

#### 回退与合并
* git checkout -- a.txt：丢弃a.txt
* git checkout -- . ：丢弃所有文件改动
* git reset --hard ：丢弃所有文件，包括添加到暂存区的内容
* git reset HEAD .：撤销所有文件保留在工作区
* git reset --hard ：撤销全部工作区和暂存区且不会保留
* git reset HEAD <fileName>：撤销当个文件 保留到工作区
* git reset --soft <commit_id>：回到你想要回到的版本，保留修改到缓冲区
* git reset --hard <commit_id> ：回到你要回到的版本且不做任何保留
* git reset --hard HEAD^：回到最新一次提交
* git reset --hard HEAD~3：回到倒数第三次修改
* git reset --hard origin/<branchName>：将本地状态回到和远程一样

#### revert回退远程仓库
* git revert <commitId>：撤销某一次提交
* git revert -n <commitId> ：撤销某一个提交并放到缓冲区重新commit

#### git merge和git rebase
* merge原理：git会自动根据两个分支的共同祖先的 commit 和两个分支的最新提交commit 进行一个三方合并，然后将合并中修改的内容生成一个新的commit，简单来说就是合并两个分支并生成一个新的提交
* rebase原理：
  1. 在执行 git rebase <mergeBranch>之前，HEAD在当前分支最后一次 commit 提交处
  2. 当执行 rebase操作时，git 会从两个分支的共同祖先的
那次 commit 开始提取当前分支上的修改
  3. 再将当前分支指针指向被合并分支的最新提交处，然后将刚刚提取的修改应用到这个最新提交后面。
 
#### git忽略文件原则
* 忽略操作系统自动生成的文件，比如缩略图等
* 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，node_modules文件等
* 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件


#### 一些使用场景
* 当一个分支上有多个提交  而上线时希望只保留一个提交时
    1.  切到master分支 拉取master最新代码 基于最新的master新建一个分支
    2. 将自己的开发分支（也就是有多个提交的分支）合并到新建分支上 执行```git merge xxx --squash``` --squash参数相当于将开发分支的内容拿到新建分支 但没有把提交记录带过来
    3. 基于新建分支 commit 后续操作都在新建分支上进行
    4. 删除本地和远程的开发分支

* 配置别名：eg:   
 ```
 // 全局配置
 git config --global alias.gco "git checkout"
 、、局部配置
 git config --local alias.gco "git checkout"
 ```
 已配置的别名：   
    1、gco: git checkout   
    2、gc：git commit   
    3、gb：git branch   
    4、ga：git add   
    5、gs： git status  
查看全局配置：git config --global --list
    